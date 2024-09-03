# Booster Project II

A card collection and booster pack opening service.

## Implemented Features

- Creating and logging into your personal account that will store your card and booster pack collection
- Collecting cards in your account's Inventory section
- Experience opening digital booster packs with a chance of getting rare cards
- Catching up with the latest project news in the News/Home section

## WIP Features

- In-app currency that user can refill by selling their cards or by using in-app purchases
- 1 free daily pack to open for anyone!
- Customizing you account
- Linking up with friends (add friend)
- Seeing other user card collections
- Trading/Selling cards and packs (maybe)
- and more ...

## Getting Started

Change .env to your environment variables (.env located in the server folder):

#MongoDB URI (with your collection login)  
MONGODB_URI = ""

#poke API, not needed anymore  
POKE_API_KEY = ""

#server side port (only port)  
PORT = ""

#session secret  
SESSION_SECRET = ""

#server side port (full)  
API_BASE_URL = ""

#client side port (full)  
API_BASE_CLIENT_URL = ""

### Installation

To install & run project:

1. Clone the project to your local machine
2. Run npm install in root folder, client folder and server folder
3. Run both scripts "fe" and "be" from root folder
4. Go to localhost:3002/
