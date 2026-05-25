# Deployment Guide - Vercel & Wix

## 🚀 Deploy to Vercel

### Prerequisites
- GitHub account with your code repository
- Vercel account (free at [vercel.com](https://vercel.com))
- Environment variables ready

### Step-by-Step Deployment

#### 1. Push Code to GitHub

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial Akotro e-commerce app commit"

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/akotro

# Push to GitHub
git push -u origin main
```

#### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Select "Import Git Repository"
4. Find and select your `akotro` repository
5. Click "Import"

#### 3. Configure Environment Variables

In Vercel project settings, add these variables:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/akotro
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxx
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
ADMIN_PASSWORD=your_secure_password
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password
NEXT_PUBLIC_API_URL=https://your-app.vercel.app
```

#### 4. Deploy

1. Click "Deploy"
2. Wait for deployment to complete (usually 2-3 minutes)
3. Get your deployment URL: `https://akotro-xxxxx.vercel.app`

### Custom Domain (Optional)

1. Go to project settings → Domains
2. Add your custom domain
3. Configure DNS records according to Vercel instructions
4. Domain will be active within 24 hours

---

## 🔗 Embed in Wix

### Method 1: Using Embed Element (Recommended)

1. **Open Wix Editor**
   - Go to your Wix website
   - Click "Edit Site"

2. **Add Embed Element**
   - Click "+" to add element
   - Search for "Embed"
   - Select "Embed Custom Element"

3. **Insert Embed Code**
   - Click "Enter Code"
   - Paste this code:

```html
<iframe 
  id="akotro-store"
  src="https://your-app.vercel.app" 
  width="100%" 
  height="800" 
  frameborder="0"
  allow="payment"
  style="border: none; display: block;"
></iframe>

<script>
  // Adjust height based on content
  const iframe = document.getElementById('akotro-store');
  
  // Handle responsive height
  window.addEventListener('message', function(event) {
    if (event.data.type === 'setHeight') {
      iframe.style.height = event.data.height + 'px';
    }
  });
  
  // Default responsive height
  function resizeIframe() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      iframe.style.height = '1000px';
    } else {
      iframe.style.height = '800px';
    }
  }
  
  resizeIframe();
  window.addEventListener('resize', resizeIframe);
</script>
```

4. **Customize Dimensions**
   - Adjust `width` and `height` as needed
   - Width: `100%` is recommended for full-width
   - Height: Adjust based on your preferences

5. **Save and Publish**
   - Click "Done"
   - Click "Publish"

### Method 2: Using Custom iFrame Code

If the embed element doesn't work, try this alternative:

```html
<div style="position: relative; width: 100%; padding-bottom: 75%;">
  <iframe
    src="https://your-app.vercel.app"
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; border-radius: 8px;"
    allow="payment"
    title="Akotro Store"
  ></iframe>
</div>
```

### Important Settings in Wix

1. **SEO (if needed)**
   - Add meta description for the embedded store

2. **Mobile Optimization**
   - Adjust height for mobile devices
   - Test on different screen sizes

3. **Payment Handling**
   - The iframe will handle all payments
   - No additional Wix configuration needed

---

## 🌐 Make App Production-Ready

### Before Going Live

#### 1. Security
- [ ] Change admin password
- [ ] Use strong passwords
- [ ] Enable HTTPS (Vercel does this automatically)
- [ ] Update `.env` variables for production

#### 2. Database
- [ ] Switch to production MongoDB Atlas tier
- [ ] Enable backups
- [ ] Configure IP whitelist (only Vercel IPs)
- [ ] Test database performance

#### 3. Payments
- [ ] Switch Razorpay to live mode (not test)
- [ ] Update `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`
- [ ] Test live payments with small amount
- [ ] Set up payment notifications

#### 4. Content
- [ ] Add all products
- [ ] Optimize product images
- [ ] Update company information
- [ ] Configure email templates
- [ ] Add privacy policy and terms

#### 5. Testing
- [ ] Test complete checkout flow
- [ ] Test on mobile devices
- [ ] Test on slow network
- [ ] Verify all links work
- [ ] Test admin panel functionality

#### 6. Performance
- [ ] Optimize images
- [ ] Check Core Web Vitals
- [ ] Enable caching
- [ ] Monitor database queries

---

## 📊 Monitoring & Maintenance

### Vercel Dashboard

1. **Deployments**
   - View all deployments
   - Rollback to previous versions
   - Check build logs

2. **Analytics**
   - Monitor page views
   - Track performance metrics
   - View error logs

3. **Functions**
   - Monitor API route performance
   - View execution times
   - Check error rates

### MongoDB Atlas Monitoring

1. **Performance**
   - Monitor query performance
   - Check CPU usage
   - View memory usage

2. **Backups**
   - View backup history
   - Configure backup schedule
   - Test restore procedures

### Razorpay Dashboard

1. **Transactions**
   - View all payments
   - Check settlement status
   - Monitor refunds

2. **Analytics**
   - Track revenue
   - Monitor transaction success rate
   - View payment methods used

---

## 🚨 Troubleshooting Deployment

### Build Fails
- Check `npm run build` locally first
- Verify all environment variables are set
- Check TypeScript errors
- Review Vercel build logs

### Pages Not Loading
- Check domain configuration
- Verify CORS settings
- Check browser console for errors
- Clear browser cache

### API Endpoints Not Working
- Verify MongoDB connection
- Check environment variables
- Test API endpoints locally
- Check Vercel function logs

### Payments Not Working
- Verify Razorpay credentials
- Check payment gateway is enabled
- Test with test credentials first
- Review payment logs in Razorpay

### Database Connection Issues
- Verify MongoDB URI
- Check IP whitelist in MongoDB Atlas
- Verify database user credentials
- Check database quota

---

## 🔄 Continuous Deployment

### Automatic Deployments

Every time you push to GitHub, Vercel automatically:
1. Builds the project
2. Runs tests
3. Deploys to production
4. Updates the live site

### Manual Deployments

From Vercel dashboard:
1. Go to "Deployments"
2. Click "Redeploy" on any previous deployment
3. Or push new code to trigger deployment

---

## 📈 Scaling Tips

### If Traffic Increases

1. **Upgrade MongoDB**
   - Increase cluster tier
   - Add more RAM
   - Enable read replicas

2. **Optimize Vercel**
   - Check function timeouts
   - Monitor edge functions
   - Use caching headers

3. **Performance**
   - Compress images
   - Implement CDN
   - Cache frequently accessed data

---

## 🔐 Security Checklist

- [ ] Change all default passwords
- [ ] Enable 2FA on Vercel and GitHub
- [ ] Configure branch protection on GitHub
- [ ] Enable HTTPS only
- [ ] Set up CORS properly
- [ ] Validate all inputs
- [ ] Sanitize database queries
- [ ] Use environment variables for secrets
- [ ] Enable database backups
- [ ] Monitor access logs

---

## 📞 Support

For deployment help:
- **Vercel Support**: https://vercel.com/support
- **MongoDB Support**: https://docs.mongodb.com/
- **Razorpay Support**: https://razorpay.com/support
- **Next.js Docs**: https://nextjs.org/docs

---

## 📝 Deployment Checklist

```
Pre-Deployment:
- [ ] All environment variables configured
- [ ] Database backups enabled
- [ ] Security review completed
- [ ] Performance testing done
- [ ] Mobile testing completed

Post-Deployment:
- [ ] Verify all pages load
- [ ] Test checkout flow
- [ ] Check admin panel access
- [ ] Monitor error logs
- [ ] Set up monitoring alerts
```

---

**Your app is now live! 🎉**

For next steps, check QUICKSTART.md for optimization tips.
