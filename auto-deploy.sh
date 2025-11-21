#!/bin/bash

# PittsburghEverything.com Automated Deployment
# Opens all necessary browser windows for deployment

echo "🚀 PittsburghEverything.com - Automated Deployment"
echo "=================================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}Step 1: Opening GitHub repository...${NC}"
sleep 2
open "https://github.com/valleytainment/pittsburgheverything.com"

echo ""
echo -e "${YELLOW}⏳ Waiting 30 seconds for you to authenticate and push to GitHub...${NC}"
echo -e "${YELLOW}   Run: git push origin main${NC}"
sleep 30

echo ""
echo -e "${BLUE}Step 2: Opening Vercel signup/login...${NC}"
sleep 2
open "https://vercel.com/login"

echo ""
echo -e "${YELLOW}⏳ Waiting 30 seconds for you to log in to Vercel...${NC}"
sleep 30

echo ""
echo -e "${BLUE}Step 3: Opening Vercel import project page...${NC}"
sleep 2
open "https://vercel.com/new"

echo ""
echo -e "${GREEN}✅ Browser windows opened!${NC}"
echo ""
echo "📋 Deployment Checklist:"
echo "1. ✅ Push code to GitHub (window 1)"
echo "2. ✅ Log in to Vercel (window 2)"
echo "3. ⏳ Import repository: valleytainment/pittsburgheverything.com"
echo "4. ⏳ Configure environment variables"
echo "5. ⏳ Deploy!"
echo ""
echo "Your site will be live at: https://pittsburgheverything.vercel.app"
echo ""
