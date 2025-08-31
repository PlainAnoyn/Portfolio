# Portfolio Backend - SMTP Email Service

This is the backend server for handling contact form submissions from your portfolio website using SMTP email functionality.

## 🚀 Features

- **SMTP Email Service** - Reliable email delivery using Gmail SMTP
- **Security** - Rate limiting, CORS protection, input validation
- **Beautiful Email Templates** - Professional HTML email templates
- **Error Handling** - Comprehensive error handling and logging
- **Development Ready** - Hot reload with nodemon

## 📋 Prerequisites

- Node.js (v14 or higher)
- Gmail account with 2FA enabled
- Gmail App Password

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Gmail App Password Setup

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Select "Mail" and "Other (Custom name)"
   - Name it "Portfolio Contact Form"
   - Copy the generated 16-character password

### 3. Environment Configuration

1. **Copy the example environment file**:
   ```bash
   cp env.example .env
   ```

2. **Edit `.env` file** with your settings:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Frontend URL (for CORS)
   FRONTEND_URL=http://localhost:5174

   # Email Configuration (Gmail)
   EMAIL_USER=your-email@gmail.com
   EMAIL_APP_PASSWORD=your-16-character-app-password

   # Security
   JWT_SECRET=your-jwt-secret-key
   ```

### 4. Start the Server

**Development mode (with hot reload)**:
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

The server will start on `http://localhost:5000`

## 📧 API Endpoints

### Health Check
```
GET /api/health
```
Returns server status and timestamp.

### Contact Form
```
POST /api/contact
```

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd like to discuss a project..."
}
```

**Response**:
```json
{
  "success": true,
  "message": "Message sent successfully! I'll get back to you soon.",
  "messageId": "message-id-from-smtp"
}
```

## 🔒 Security Features

- **Rate Limiting**: 5 requests per minute per IP
- **CORS Protection**: Only allows requests from configured frontend URL
- **Input Validation**: Email format, message length, required fields
- **Helmet**: Security headers
- **Error Handling**: No sensitive information leaked in production

## 📧 Email Template

The server sends beautifully formatted HTML emails with:
- Professional styling matching your portfolio theme
- Contact information clearly displayed
- Timestamp of submission
- Reply-to header set to sender's email

## 🚨 Troubleshooting

### Common Issues

1. **"Authentication failed" error**:
   - Ensure 2FA is enabled on Gmail
   - Use App Password, not regular password
   - Check email and app password in `.env`

2. **"Connection timeout" error**:
   - Check internet connection
   - Verify Gmail SMTP settings
   - Ensure firewall isn't blocking port 465

3. **CORS errors**:
   - Verify `FRONTEND_URL` in `.env` matches your frontend URL
   - Check that frontend is running on the correct port

### Debug Mode

Set `NODE_ENV=development` in `.env` to see detailed error messages.

## 📁 Project Structure

```
backend/
├── server.js          # Main server file
├── package.json       # Dependencies and scripts
├── env.example        # Environment variables template
├── .env              # Environment variables (create this)
└── README.md         # This file
```

## 🔄 Integration with Frontend

The frontend Contact component is already configured to use this backend. Make sure:

1. Backend is running on `http://localhost:5000`
2. Frontend is running on `http://localhost:5174`
3. CORS is properly configured in `.env`

## 🚀 Deployment

For production deployment:

1. Set `NODE_ENV=production`
2. Use a proper domain for `FRONTEND_URL`
3. Use environment variables for sensitive data
4. Consider using a process manager like PM2
5. Set up SSL/TLS for secure communication

## 📞 Support

If you encounter any issues:
1. Check the console logs for error messages
2. Verify all environment variables are set correctly
3. Test the health endpoint: `GET /api/health` 