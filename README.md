# Vaalilupaukset

A React + Node.js application for tracking Finnish election promises against actual outcomes.

## Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Data focus: Parliamentary elections, party and candidate promises, economic indicators

## Local development

1. Install dependencies:
   npm install
   npm install --prefix client
   npm install --prefix server
2. Start the app:
   npm run dev
3. Frontend: http://localhost:5173
4. Backend API: http://localhost:5000/api

## Environment variables

Copy the server example file and adjust as needed:

cp server/.env.example server/.env

## GitHub setup

Create a remote repository on GitHub and then run:

git init
git add .
git commit -m "Initial project setup"
git branch -M main
git remote add origin <your-github-url>
git push -u origin main

## Planned features

- Election year overview
- Party-level data and vote share map
- Candidate promise tracking
- KPI progress for party/candidate commitments
- Economic and social indicator dashboards
