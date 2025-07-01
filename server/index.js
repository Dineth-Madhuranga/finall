import express from "express"
import nodemailer from "nodemailer"
import cors from "cors"
import dotenv from "dotenv"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

// Initialize dotenv
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

// Middleware
app.use(cors())
app.use(express.json({ limit: "100mb" })) // Increase from 50mb to 100mb
app.use(express.urlencoded({ limit: "100mb", extended: true })) // Increase from 50mb to 100mb

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Use an App Password if 2FA is enabled
  },
})

// Helper function to format special requests for HTML display
const formatSpecialRequests = (requests) => {
  if (!requests) return "None"
  // Replace new lines with HTML line breaks
  return requests.replace(/\n/g, "<br>")
}

// Helper function to format order timestamp
const formatOrderDate = (timestamp) => {
  if (!timestamp) return new Date().toLocaleString()
  return new Date(timestamp).toLocaleString()
}

// Helper function to create email attachments from user images
const createImageAttachments = (userImages) => {
  if (!userImages || userImages.length === 0) return []

  return userImages.map((image, index) => {
    // Extract base64 data from data URL
    const base64Data = image.data.split(",")[1]

    return {
      filename: image.name || `user-image-${index + 1}.jpg`,
      content: base64Data,
      encoding: "base64",
      contentType: image.type || "image/jpeg",
      cid: `user-image-${index}`, // Content ID for embedding in HTML
    }
  })
}

// Helper function to generate HTML for user images in email
const generateUserImagesHTML = (userImages) => {
  if (!userImages || userImages.length === 0) {
    return "<p>No images uploaded by customer.</p>"
  }

  let html = `<div style="margin-top: 20px;">
    <h4 style="color: #2575fc; margin-bottom: 15px;">Customer Uploaded Images (${userImages.length})</h4>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">`

  userImages.forEach((image, index) => {
    html += `
      <div style="border: 2px solid #ddd; border-radius: 8px; overflow: hidden; background: white;">
        <img src="cid:user-image-${index}" alt="${image.name}" style="width: 100%; height: 150px; object-fit: cover;">
        <div style="padding: 8px; font-size: 12px; color: #666; text-align: center;">
          <strong>${image.name}</strong><br>
          Size: ${(image.size / 1024 / 1024).toFixed(2)} MB
        </div>
      </div>`
  })

  html += "</div></div>"
  return html
}

// Order submission endpoint
app.post("/api/submit-order", async (req, res) => {
  try {
    const {
      // Customer Information
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      customerWhatsapp,
      customerRequests,

      // Frame Information
      frame,

      // Size and Pricing
      size,
      isSpecialSize,
      unitPrice,
      quantity,
      totalPrice,

      // Collage Selection Details
      collageDetails,

      // Frame Customization Details
      frameCustomization,

      // User uploaded images
      userImages,

      // Order Summary
      orderSummary,

      // Additional metadata
      metadata,
    } = req.body

    // Format special size text
    const sizeText = isSpecialSize ? "Special Custom Size" : `${size} inches`

    // Format currency
    const formattedPrice = `LKR ${Number(totalPrice).toLocaleString()}`
    const formattedUnitPrice = `LKR ${Number(unitPrice).toLocaleString()}`

    // Format special requests for HTML display
    const formattedRequests = formatSpecialRequests(customerRequests)

    // Format order date
    const orderDate = formatOrderDate(orderSummary?.orderDate || metadata?.orderTimestamp)

    // Create image attachments
    const imageAttachments = createImageAttachments(userImages)

    // Generate user images HTML
    const userImagesHTML = generateUserImagesHTML(userImages)

    // Email content for owner with comprehensive details
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.OWNER_EMAIL,
      subject: `New Frame Order #${Date.now()} - The Artistic Unity`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Order Notification</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              background-color: #f9f9f9;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 700px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              padding: 20px 0;
              background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
              color: white;
              border-radius: 8px 8px 0 0;
              margin: -20px -20px 20px;
            }
            .logo {
              font-size: 28px;
              font-weight: bold;
              margin-bottom: 5px;
            }
            .tagline {
              font-size: 14px;
              opacity: 0.8;
            }
            h2 {
              color: #6a11cb;
              border-bottom: 2px solid #f0f0f0;
              padding-bottom: 10px;
              margin-top: 30px;
            }
            h3 {
              color: #2575fc;
              margin-top: 25px;
              margin-bottom: 15px;
            }
            .section {
              margin-bottom: 25px;
            }
            .detail-row {
              display: flex;
              margin-bottom: 8px;
              border-bottom: 1px solid #f0f0f0;
              padding-bottom: 8px;
            }
            .detail-label {
              font-weight: bold;
              width: 40%;
              color: #555;
            }
            .detail-value {
              width: 60%;
            }
            .price {
              font-size: 20px;
              color: #2575fc;
              font-weight: bold;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              font-size: 12px;
              color: #999;
            }
            .highlight {
              background-color: #f8f4ff;
              padding: 15px;
              border-radius: 6px;
              margin: 15px 0;
            }
            .requests {
              background-color: #fff8e6;
              padding: 15px;
              border-radius: 6px;
              margin: 15px 0;
              border-left: 4px solid #ffc107;
            }
            .selection-box {
              background-color: #f0f7ff;
              padding: 15px;
              border-radius: 6px;
              margin: 15px 0;
              border-left: 4px solid #2575fc;
            }
            .image-preview {
              max-width: 200px;
              max-height: 200px;
              border: 2px solid #ddd;
              border-radius: 4px;
              margin: 10px 0;
            }
            .status-badge {
              display: inline-block;
              padding: 4px 8px;
              border-radius: 4px;
              font-size: 12px;
              font-weight: bold;
            }
            .status-selected {
              background-color: #d4edda;
              color: #155724;
            }
            .status-not-selected {
              background-color: #f8d7da;
              color: #721c24;
            }
            .order-id {
              background-color: #e9ecef;
              padding: 10px;
              border-radius: 4px;
              text-align: center;
              font-weight: bold;
              margin-bottom: 20px;
            }
            .user-images-section {
              background-color: #f0f9ff;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
              border-left: 4px solid #10b981;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">The Artistic Unity</div>
              <div class="tagline">Creating Beautiful Memories</div>
            </div>
            
            <div class="order-id">
              Order ID: #${Date.now()} | ${orderDate}
            </div>
            
            <h2>🎉 New Order Received!</h2>
            
            <div class="section">
              <h3>👤 Customer Information</h3>
              <div class="detail-row">
                <div class="detail-label">Name:</div>
                <div class="detail-value">${customerName}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Email:</div>
                <div class="detail-value">${customerEmail}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Phone:</div>
                <div class="detail-value">${customerPhone}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">WhatsApp:</div>
                <div class="detail-value">${customerWhatsapp || "Not provided"}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Address:</div>
                <div class="detail-value">${customerAddress}</div>
              </div>
            </div>
            
            <div class="section">
              <h3>🖼️ Frame & Order Details</h3>
              <div class="highlight">
                <div class="detail-row">
                  <div class="detail-label">Frame Type:</div>
                  <div class="detail-value">${frame.name}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Frame Category:</div>
                  <div class="detail-value">${frame.category}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Frame Description:</div>
                  <div class="detail-value">${frame.description || "Not provided"}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Size:</div>
                  <div class="detail-value">${sizeText}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Quantity:</div>
                  <div class="detail-value">${quantity}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Unit Price:</div>
                  <div class="detail-value">${formattedUnitPrice}</div>
                </div>
              </div>
              
              <div class="detail-row" style="border-top: 2px solid #e0e0e0; margin-top: 15px; padding-top: 15px;">
                <div class="detail-label">Total Price:</div>
                <div class="detail-value price">${formattedPrice}</div>
              </div>
            </div>
            
            <div class="section">
              <h3>🎨 Collage Selection Details</h3>
              <div class="selection-box">
                <div class="detail-row">
                  <div class="detail-label">Collage Size:</div>
                  <div class="detail-value">${collageDetails?.size || "Not specified"}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Orientation:</div>
                  <div class="detail-value">${collageDetails?.orientation || "Not specified"}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Category:</div>
                  <div class="detail-value">${collageDetails?.category || "Not selected"}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Collage Design:</div>
                  <div class="detail-value">
                    ${collageDetails?.selectedImage && collageDetails.selectedImage !== "Not selected"
          ? `<span class="status-badge status-selected">✓ Selected</span>`
          : `<span class="status-badge status-not-selected">✗ Not Selected</span>`
        }
                  </div>
                </div>
                ${collageDetails?.selectedImage && collageDetails.selectedImage !== "Not selected"
          ? `
                    <div style="margin-top: 15px;">
                      <strong>Selected Collage Design:</strong><br>
                      <img src="${collageDetails.selectedImage}" alt="Selected Collage" class="image-preview" style="max-width: 300px; max-height: 300px;">
                    </div>
                  `
          : ""
        }
              </div>
            </div>
            
            <div class="section">
              <h3>🖼️ Frame Customization Details</h3>
              <div class="selection-box">
                <div class="detail-row">
                  <div class="detail-label">Frame Type:</div>
                  <div class="detail-value">${frameCustomization?.frameType || "Not specified"}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Frame Design:</div>
                  <div class="detail-value">
                    ${frameCustomization?.selectedFrameImage && frameCustomization.selectedFrameImage !== "Not selected"
          ? `<span class="status-badge status-selected">✓ Selected</span>`
          : `<span class="status-badge status-not-selected">✗ Not Selected</span>`
        }
                  </div>
                </div>
                ${frameCustomization?.selectedFrameImage && frameCustomization.selectedFrameImage !== "Not selected"
          ? `
                    <div style="margin-top: 15px;">
                      <strong>Selected Frame Design:</strong><br>
                      <img src="${frameCustomization.selectedFrameImage}" alt="Selected Frame" class="image-preview" style="max-width: 250px; max-height: 250px;">
                    </div>
                  `
          : ""
        }
              </div>
            </div>
            
            <div class="section">
              <h3>📸 Customer Uploaded Images</h3>
              <div class="user-images-section">
                <div class="detail-row">
                  <div class="detail-label">Images Count:</div>
                  <div class="detail-value">
                    ${userImages && userImages.length > 0
          ? `<span class="status-badge status-selected">${userImages.length} images uploaded</span>`
          : `<span class="status-badge status-not-selected">No images uploaded</span>`
        }
                  </div>
                </div>
                ${userImagesHTML}
              </div>
            </div>
            
            <div class="section">
              <h3>📋 Order Summary</h3>
              <div class="highlight">
                <div class="detail-row">
                  <div class="detail-label">Collage Selected:</div>
                  <div class="detail-value">
                    ${orderSummary?.hasCollageSelected
          ? `<span class="status-badge status-selected">✓ Yes</span>`
          : `<span class="status-badge status-not-selected">✗ No</span>`
        }
                  </div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Frame Design Selected:</div>
                  <div class="detail-value">
                    ${orderSummary?.hasFrameDesignSelected
          ? `<span class="status-badge status-selected">✓ Yes</span>`
          : `<span class="status-badge status-not-selected">✗ No</span>`
        }
                  </div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Customer Images:</div>
                  <div class="detail-value">
                    ${orderSummary?.hasUserImages
          ? `<span class="status-badge status-selected">✓ ${orderSummary.userImagesCount} images</span>`
          : `<span class="status-badge status-not-selected">✗ No images</span>`
        }
                  </div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Order Source:</div>
                  <div class="detail-value">${metadata?.orderSource || "Website"}</div>
                </div>
              </div>
            </div>
            
            ${customerRequests
          ? `
              <div class="section">
                <h3>📝 Special Requests</h3>
                <div class="requests">
                  ${formattedRequests}
                </div>
              </div>
              `
          : ""
        }
            
            <div class="section">
              <h3>🔧 Technical Information</h3>
              <div style="font-size: 12px; color: #666;">
                <p><strong>Browser:</strong> ${metadata?.browserInfo || "Not available"}</p>
                <p><strong>Order Timestamp:</strong> ${metadata?.orderTimestamp || "Not available"}</p>
              </div>
            </div>
            
            <div class="footer">
              <p>This is an automated notification from The Artistic Unity ordering system.</p>
              <p>© ${new Date().getFullYear()} The Artistic Unity. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      attachments: imageAttachments,
    }

    // Send email to owner
    await transporter.sendMail(mailOptions)

    // Send confirmation email to customer with selected images and their uploaded images
    const customerMailOptions = {
      from: process.env.EMAIL_USER,
      to: customerEmail,
      subject: `Order Confirmation #${Date.now()} - The Artistic Unity`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Confirmation</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              background-color: #f9f9f9;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              padding: 20px 0;
              background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
              color: white;
              border-radius: 8px 8px 0 0;
              margin: -20px -20px 20px;
            }
            .logo {
              font-size: 28px;
              font-weight: bold;
              margin-bottom: 5px;
            }
            .tagline {
              font-size: 14px;
              opacity: 0.8;
            }
            h2 {
              color: #6a11cb;
              border-bottom: 2px solid #f0f0f0;
              padding-bottom: 10px;
              margin-top: 30px;
            }
            h3 {
              color: #2575fc;
              margin-top: 25px;
            }
            .section {
              margin-bottom: 25px;
            }
            .detail-row {
              display: flex;
              margin-bottom: 8px;
              border-bottom: 1px solid #f0f0f0;
              padding-bottom: 8px;
            }
            .detail-label {
              font-weight: bold;
              width: 40%;
              color: #555;
            }
            .detail-value {
              width: 60%;
            }
            .price {
              font-size: 20px;
              color: #2575fc;
              font-weight: bold;
            }
            .message {
              background-color: #f0f7ff;
              padding: 15px;
              border-radius: 6px;
              margin: 15px 0;
              border-left: 4px solid #2575fc;
            }
            .highlight {
              background-color: #f8f4ff;
              padding: 15px;
              border-radius: 6px;
              margin: 15px 0;
            }
            .requests {
              background-color: #fff8e6;
              padding: 15px;
              border-radius: 6px;
              margin: 15px 0;
              border-left: 4px solid #ffc107;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              font-size: 12px;
              color: #999;
            }
            .social {
              margin-top: 20px;
              text-align: center;
            }
            .social a {
              display: inline-block;
              margin: 0 10px;
              color: #6a11cb;
              text-decoration: none;
            }
            .whatsapp-button {
              background-color: #25D366;
              color: white;
              text-decoration: none;
              padding: 10px 15px;
              border-radius: 4px;
              display: inline-block;
              margin-top: 10px;
              font-weight: bold;
            }
            .image-preview {
              max-width: 200px;
              max-height: 200px;
              border: 2px solid #ddd;
              border-radius: 4px;
              margin: 10px 0;
            }
            .selection-box {
              background-color: #f0f7ff;
              padding: 15px;
              border-radius: 6px;
              margin: 15px 0;
              border-left: 4px solid #2575fc;
            }
            .order-id {
              background-color: #e9ecef;
              padding: 10px;
              border-radius: 4px;
              text-align: center;
              font-weight: bold;
              margin-bottom: 20px;
            }
            .user-images-section {
              background-color: #f0f9ff;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
              border-left: 4px solid #10b981;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">The Artistic Unity</div>
              <div class="tagline">Creating Beautiful Memories</div>
            </div>
            
            <div class="order-id">
              Order ID: #${Date.now()}
            </div>
            
            <h2>🎉 Thank You for Your Order!</h2>
            
            <div class="message">
              <p>Dear ${customerName},</p>
              <p>Thank you for choosing The Artistic Unity. We have received your order and are working on it with care and attention to detail.</p>
              <p>We will contact you shortly to confirm delivery details.</p>
            </div>
            
            <div class="section">
              <h3>Your Order Details</h3>
              <div class="highlight">
                <div class="detail-row">
                  <div class="detail-label">Frame:</div>
                  <div class="detail-value">${frame.name}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Frame Category:</div>
                  <div class="detail-value">${frame.category}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Size:</div>
                  <div class="detail-value">${sizeText}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Orientation:</div>
                  <div class="detail-value">${collageDetails?.orientation || "Not specified"}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Collage Category:</div>
                  <div class="detail-value">${collageDetails?.category || "Not selected"}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Your Images:</div>
                  <div class="detail-value">${userImages && userImages.length > 0 ? `${userImages.length} images uploaded` : "None uploaded"}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Quantity:</div>
                  <div class="detail-value">${quantity}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Unit Price:</div>
                  <div class="detail-value">${formattedUnitPrice}</div>
                </div>
              </div>
              
              <div class="detail-row" style="border-top: 2px solid #e0e0e0; margin-top: 15px; padding-top: 15px;">
                <div class="detail-label">Total Price:</div>
                <div class="detail-value price">${formattedPrice}</div>
              </div>
            </div>
            
            ${collageDetails?.selectedImage && collageDetails.selectedImage !== "Not selected"
          ? `
              <div class="section">
                <h3>Your Selected Collage Design</h3>
                <div class="selection-box">
                  <p>Here's the collage design you selected:</p>
                  <div style="text-align: center;">
                    <img src="${collageDetails.selectedImage}" alt="Your Selected Collage" class="image-preview" style="max-width: 300px; max-height: 300px;">
                  </div>
                </div>
              </div>
              `
          : ""
        }
            
            ${frameCustomization?.selectedFrameImage && frameCustomization.selectedFrameImage !== "Not selected"
          ? `
              <div class="section">
                <h3>Your Selected Frame Design</h3>
                <div class="selection-box">
                  <p>Here's the frame design you selected:</p>
                  <div style="text-align: center;">
                    <img src="${frameCustomization.selectedFrameImage}" alt="Your Selected Frame" class="image-preview" style="max-width: 250px; max-height: 250px;">
                  </div>
                </div>
              </div>
              `
          : ""
        }

            ${userImages && userImages.length > 0
          ? `
              <div class="section">
                <h3>Your Uploaded Images</h3>
                <div class="user-images-section">
                  <p>Here are the ${userImages.length} image(s) you uploaded for your custom collage:</p>
                  ${userImagesHTML}
                  <p style="margin-top: 15px; font-size: 14px; color: #666;">
                    <strong>Note:</strong> Our design team will use these images to create your custom collage according to your selected style and preferences.
                  </p>
                </div>
              </div>
              `
          : ""
        }
            
            ${customerRequests
          ? `
              <div class="section">
                <h3>Your Special Requests</h3>
                <div class="requests">
                  ${formattedRequests}
                </div>
              </div>
              `
          : ""
        }
            
            <div class="section">
              <h3>What's Next?</h3>
              <p>Our team will review your order and contact you within 24-48 hours to confirm the details and arrange delivery.</p>
              <p>If you have any questions about your order, please contact us at <a href="mailto:ashengamage238@gmail.com">ashengamage238@gmail.com</a> or call us at +94 712961268.</p>
              <p>You can also reach us on WhatsApp for faster responses:</p>
              <div style="text-align: center;">
                <a href="https://wa.me/94712961268" class="whatsapp-button">Contact Us on WhatsApp</a>
              </div>
            </div>
            
            <div class="social">
              <p>Follow us for updates and inspiration:</p>
              <a href="#">Facebook</a> | <a href="#">Instagram</a> | <a href="#">Pinterest</a>
            </div>
            
            <div class="footer">
              <p>© ${new Date().getFullYear()} The Artistic Unity. All rights reserved.</p>
              <p>Colombo, Sri Lanka</p>
            </div>
          </div>
        </body>
        </html>
      `,
      attachments: imageAttachments, // Include user images as attachments for customer too
    }

    await transporter.sendMail(customerMailOptions)

    res.status(200).json({ message: "Order submitted successfully" })
  } catch (error) {
    console.error("Error sending email:", error)
    res.status(500).json({ message: "Failed to submit order", error: error.message })
  }
})

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Server is running" })
})

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(join(__dirname, "../dist")))
}

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
