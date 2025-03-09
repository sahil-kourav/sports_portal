  const Razorpay = require("razorpay");
const crypto = require("crypto");
const dotenv = require("dotenv");
const Tournament = require("../models/tournament.model");
const TournamentPurchase = require("../models/tournamentPurchase.model");
const User = require("../models/user.model");


// Initialize Razorpay instance with API credentials
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.ROZERPAY_SECRET_KEY,
});

/**
 * @desc Create a Razorpay order for tournament registration
 * @route POST /api/payment/create-order
 * @access Private (Authenticated users only)
 */
exports.createOrder = async (req, res) => {
  try {
    const { tournamentId } = req.body;
    const userId = req.id;

    // Fetch tournament details from database
    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) return res.status(404).json({ message: "Tournament not found!" });

    // Define order options for Razorpay
    const options = {
      amount: tournament.registrationFee * 100, // Amount in paise (INR)
      currency: "INR",
      receipt: `rcpt_${userId.substring(0, 10)}_${Date.now().toString().slice(-5)}`, // ✅ Ensure < 40 chars
      payment_capture: 1,
    };


    // Create Razorpay order
    const order = await razorpay.orders.create(options);

    // Save order details in database
    const newPurchase = new TournamentPurchase({
      tournamentId,
      userId,
      amount: tournament.registrationFee,
      paymentId: order.id,
      status: "pending",
    });
    await newPurchase.save();

    // Return order details along with success/cancel URLs
    return res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      success_url: `http://localhost:5173/tournament-progress/${tournamentId}`, // Redirect on successful payment
      cancel_url: `http://localhost:5173/tournament-detail/${tournamentId}`, // Redirect if payment is canceled
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ message: "Error creating order" });
  }
};

/**
 * @desc Handle Razorpay webhook to verify payments
 * @route POST /api/payment/webhook
 * @access Public (Called by Razorpay)
 */
exports.razorpayWebhook = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers["x-razorpay-signature"];

    // Generate HMAC signature for verification
    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (generatedSignature !== signature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    // Process successful payment
    if (req.body.event === "payment.captured") {
      console.log("✅ Payment Captured Webhook Triggered");
      const { order_id, amount } = req.body.payload.payment.entity;

      const purchase = await TournamentPurchase.findOne({ paymentId: order_id });
      if (!purchase) return res.status(404).json({ message: "Purchase not found" });

      // Update purchase status in database
      purchase.amount = amount / 100; // Convert paise to INR
      purchase.status = "completed";
      await purchase.save();

      // Add tournament to user's enrolled list
      await User.findByIdAndUpdate(purchase.userId, {
        $addToSet: { enrolledTournaments: purchase.tournamentId },
      });

      // Return success response with redirect URL
      return res.status(200).json({
        success: true,
        message: "Payment processed successfully",
        redirectUrl: `http://localhost:5173/tournament-progress/${purchase.tournamentId}`,
      });
    }

    res.status(200).send("OK");
  } catch (error) {
    console.error("Webhook error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @desc Get tournament details along with user purchase status
 * @route GET /api/tournament/:tournamentId
 * @access Private (Authenticated users only)
 */
exports.getTournamentDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { tournamentId } = req.params;
    const userId = req.id;

    // Fetch tournament details and check if user has purchased it
    const tournament = await Tournament.findById(tournamentId).populate({ path: "creator" });
    const purchased = await TournamentPurchase.findOne({ userId, tournamentId });

    if (!tournament) return res.status(404).json({ message: "Tournament not found!" });

    return res.status(200).json({
      tournament,
      purchased: !!purchased,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching tournament details" });
  }
};

/**
 * @desc Get all successfully purchased tournaments
 * @route GET /api/payment/purchased-tournaments
 * @access Private (Admin only)
 */
exports.getAllPurchasedTournaments = async (_, res) => {
  try {
    // Fetch all completed purchases
    const purchasedTournaments = await TournamentPurchase.find({ status: "completed" }).populate("tournamentId");
    if (!purchasedTournaments) return res.status(404).json({ purchasedTournaments: [] });

    return res.status(200).json({ purchasedTournaments });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching purchased tournaments" });
  }
};













// const Razorpay = require("razorpay");
// const crypto = require("crypto");
// const dotenv = require("dotenv");
// const { Tournament } = require("../models/tournament.model");
// const { TournamentPurchase } = require("../models/tournamentPurchase.model");
// const { User } = require("../models/user.model");

// // dotenv.config();

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.ROZERPAY_SECRET_KEY,
// });

// // 🟢 1️⃣ CREATE ORDER
// exports.createOrder = async (req, res) => {
//   try {
//     const { tournamentId } = req.body;
//     const userId = req.id;

//     const tournament = await Tournament.findById(tournamentId);
//     if (!tournament) return res.status(404).json({ message: "Tournament not found!" });

//     const options = {
//       amount: tournament.registrationFee * 100,
//       currency: "INR",
//       receipt: `receipt_${userId}_${Date.now()}`,
//     };

//     const order = await razorpay.orders.create(options);

//     const newPurchase = new TournamentPurchase({
//       tournamentId,
//       userId,
//       amount: tournament.registrationFee,
//       paymentId: order.id,
//       status: "pending",
//     });

//     await newPurchase.save();

//     return res.status(200).json({ success: true, orderId: order.id, amount: order.amount, currency: order.currency });
//   } catch (error) {
//     console.error("Error creating Razorpay order:", error);
//     res.status(500).json({ message: "Error creating order" });
//   }
// };

// // 🔵 2️⃣ VERIFY PAYMENT (Webhook)
// exports.razorpayWebhook = async (req, res) => {
//   try {
//     const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
//     const signature = req.headers["x-razorpay-signature"];

//     const generatedSignature = crypto
//       .createHmac("sha256", secret)
//       .update(JSON.stringify(req.body))
//       .digest("hex");

//     if (generatedSignature !== signature) {
//       return res.status(400).json({ success: false, message: "Invalid signature" });
//     }

//     if (req.body.event === "payment.captured") {
//       console.log("✅ Payment Captured Webhook Triggered");
//       const { order_id, amount } = req.body.payload.payment.entity;

//       const purchase = await TournamentPurchase.findOne({ paymentId: order_id });

//       if (!purchase) return res.status(404).json({ message: "Purchase not found" });

//       purchase.amount = amount / 100;
//       purchase.status = "completed";
//       await purchase.save();

//       await User.findByIdAndUpdate(purchase.userId, { $addToSet: { enrolledTournaments: purchase.tournamentId } });

//       return res.status(200).json({ success: true, message: "Payment processed successfully" });
//     }

//     res.status(200).send("OK");
//   } catch (error) {
//     console.error("Webhook error:", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// // 🟡 3️⃣ GET TOURNAMENT PURCHASE STATUS
// exports.getTournamentDetailWithPurchaseStatus = async (req, res) => {
//   try {
//     const { tournamentId } = req.params;
//     const userId = req.id;

//     const tournament = await Tournament.findById(tournamentId).populate({ path: "creator" });
//     const purchased = await TournamentPurchase.findOne({ userId, tournamentId });

//     if (!tournament) return res.status(404).json({ message: "Tournament not found!" });

//     return res.status(200).json({
//       tournament,
//       purchased: !!purchased,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Error fetching tournament details" });
//   }
// };

// // 🔴 4️⃣ GET ALL PURCHASED TOURNAMENTS
// exports.getAllPurchasedTournaments = async (_, res) => {
//   try {
//     const purchasedTournaments = await TournamentPurchase.find({ status: "completed" }).populate("tournamentId");
//     if (!purchasedTournaments) return res.status(404).json({ purchasedTournaments: [] });

//     return res.status(200).json({ purchasedTournaments });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Error fetching purchased tournaments" });
//   }
// };








// const Razorpay = require("razorpay");
// const crypto = require("crypto");
// const dotenv = require("dotenv");
// const Tournament = require("../models/tournament.model");
// const TournamentPurchase = require("../models/tournamentPurchase.model");
// const User = require("../models/user.model");


// // Initialize Razorpay instance with API credentials
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.ROZERPAY_SECRET_KEY,
// });

// /**
//  * @desc Create a Razorpay order for tournament registration
//  * @route POST /api/payment/create-order
//  * @access Private (Authenticated users only)
//  */
// exports.createOrder = async (req, res) => {
//   try {
//     const { tournamentId } = req.body;
//     const userId = req.id;

//     // Fetch tournament details from database
//     const tournament = await Tournament.findById(tournamentId);
//     if (!tournament) return res.status(404).json({ message: "Tournament not found!" });


//     // Create a new course purchase record
//     const newPurchase = new TournamentPurchase({
//       tournamentId,
//       userId,
//       amount: tournament.registrationFee,
//       paymentId: order.id,
//       status: "pending",
//     });


//     // Define order options for Razorpay
//     const order = await razorpay.orders.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "INR",
//             product_data: {
//               name: tournament.tournamentTitle,
//               images: [tournament.tournamentThumbnail],
//             },
//             amount: tournament.registrationFee * 100, // Amount in paise (INR)
//           },
//           // receipt: `rcpt_${userId.substring(0, 10)}_${Date.now().toString().slice(-5)}`, // ✅ Ensure < 40 chars
//           payment_capture: 1,
//         },
//       ],
//       mode: "payment",
//       success_url: `http://localhost:5173/tournament-progress/${tournamentId}`, // once payment successful redirect to course progress page
//       cancel_url: `http://localhost:5173/tournament-detail/${tournamentId}`,
//       metadata: {
//         tournamentId: tournamentId,
//         userId: userId,
//       },
//       shipping_address_collection: {
//         allowed_countries: ["IN"], // Optionally restrict allowed countries
//       },
//     });

//     if (!order.url) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Error while creating order" });
//     }

//     // Save the purchase record
//     newPurchase.paymentId = order.id;
//     await newPurchase.save();

//     return res.status(200).json({
//       success: true,
//       orderId: order.id,
//       amount: order.amount,
//       currency: order.currency,
//       url: order.url, // Return the Stripe checkout URL
//     });
//   } catch (error) {
//     console.error("Error creating Razorpay order:", error);
//     res.status(500).json({ message: "Error creating order" });
//   }
// };

// /**
//  * @desc Handle Razorpay webhook to verify payments
//  * @route POST /api/payment/webhook
//  * @access Public (Called by Razorpay)
//  */
// exports.razorpayWebhook = async (req, res) => {
// let event;

//   try {
//     const payloadString = JSON.stringify(req.body, null, 2);
//     const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
//     const signature = req.headers["x-razorpay-signature"];

//     // Generate HMAC signature for verification
//     const generatedSignature = crypto
//       .createHmac("sha256", secret)
//       .update(JSON.stringify(req.body))
//       .digest("hex");

//     if (generatedSignature !== signature) {
//       return res.status(400).json({ success: false, message: "Invalid signature" });
//     }

//     // Process successful payment
//     if (req.body.event === "payment.captured") {
//       console.log("✅ Payment Captured Webhook Triggered");
//       const { order_id, amount } = req.body.payload.payment.entity;

//       const purchase = await TournamentPurchase.findOne({ paymentId: order_id });
//       if (!purchase) return res.status(404).json({ message: "Purchase not found" });

//       // Update purchase status in database
//       purchase.amount = amount / 100; // Convert paise to INR
//       purchase.status = "completed";
//       await purchase.save();

//       // Add tournament to user's enrolled list
//       await User.findByIdAndUpdate(purchase.userId, {
//         $addToSet: { enrolledTournaments: purchase.tournamentId },
//       });

//       // Return success response with redirect URL
//       return res.status(200).json({
//         success: true,
//         message: "Payment processed successfully",
//         redirectUrl: `http://localhost:5173/tournament-progress/${purchase.tournamentId}`,
//       });
//     }

//     res.status(200).send("OK");
//   } catch (error) {
//     console.error("Webhook error:", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// /**
//  * @desc Get tournament details along with user purchase status
//  * @route GET /api/tournament/:tournamentId
//  * @access Private (Authenticated users only)
//  */
// exports.getTournamentDetailWithPurchaseStatus = async (req, res) => {
//   try {
//     const { tournamentId } = req.params;
//     const userId = req.id;

//     // Fetch tournament details and check if user has purchased it
//     const tournament = await Tournament.findById(tournamentId).populate({ path: "creator" });
//     const purchased = await TournamentPurchase.findOne({ userId, tournamentId });

//     if (!tournament) return res.status(404).json({ message: "Tournament not found!" });

//     return res.status(200).json({
//       tournament,
//       purchased: !!purchased,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Error fetching tournament details" });
//   }
// };

// /**
//  * @desc Get all successfully purchased tournaments
//  * @route GET /api/payment/purchased-tournaments
//  * @access Private (Admin only)
//  */
// exports.getAllPurchasedTournaments = async (_, res) => {
//   try {
//     // Fetch all completed purchases
//     const purchasedTournaments = await TournamentPurchase.find({ status: "completed" }).populate("tournamentId");
//     if (!purchasedTournaments) return res.status(404).json({ purchasedTournaments: [] });

//     return res.status(200).json({ purchasedTournaments });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Error fetching purchased tournaments" });
//   }
// };



