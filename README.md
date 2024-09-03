                      _________________
                     /                /|
                    /                / |
                   /________________/  |
                  |                |   |
                  |   _________    |   |
                  |  |   _   _ |   |   |
                  |  |  |_| |_| |  |   |
                  |  |   _   _  |  |   |
                  |  |__| | | |__|  |   |
                  |________________|   /
                  |________________|  /
                 /_________________/ /
                /_________________/ /
               |_________________|/

# Marketplace

A template build of a ecommerce online marketplace.

## Main Features

- Authentication (login, register, also with Google and possibly other social media accounts)
- In-App balance
- Listing available products on the application (stored information about the products in database)
- Creating a cart of items with custom quantity
- Creating an order of the selected cart
- Sending emails about application news and customer orders

## WIP Features

- Listing available products on the application (stored information about the products in database), possibly using a custom dev script
- Creating a cart of items with custom quantity
- Creating an order of the selected cart
- Sending emails about application news and customer orders

## Getting Started

Change .env to your environment variables (.env located in the server folder):

#MongoDB URI (with your collection login)  
MONGODB_URI = ""

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
4. Go to localhost:3003/
