# Hostel Allocation System

Welcome to the Hostel Allocation System! This system helps allocate hostel rooms based on group information and hostel capacities.

https://github.com/hanish-rishen/hostel-allocation/assets/110720727/8191a728-d5d2-457a-b16a-a06c3a2f1163

## Features

- **Upload CSV Files:** Upload group information and hostel information CSV files.
- **Allocate Rooms:** Automatically allocate rooms based on group size and gender requirements.
- **View Allocation Results:** View the allocation results in a table format.

## Getting Started

To get started with the Hostel Allocation System, follow these steps:

### Prerequisites

- Node.js installed on your local machine
- npm (Node Package Manager) installed on your local machine

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/hanish-rishen/hostel-allocation.git
   cd hostel-allocation
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Usage

1. **Start the Server:**

   Start the server by running the following command:

   ```bash
   node server.js
   ```

   The server will start and run on `http://localhost:3000`.

2. **Upload CSV Files:**

   - Navigate to `http://localhost:3000` in your web browser.
   - Click on the "Choose File" button under "Upload Group Information CSV" to select and upload a CSV file containing group information.
   - Click on the "Choose File" button under "Upload Hostel Information CSV" to select and upload a CSV file containing hostel information.
   - Click the "Submit" button to initiate the room allocation process.

3. **View Allocation Results:**

   - Once the allocation process completes, the results will be displayed in a table format on the same page.
   - The table includes columns for Group ID, Hostel Name, Room Number, and Members Allocated.

4. **Downloading Results as CSV:**

   To download the allocation results as a CSV file, follow these steps:
   - After the results are displayed on the webpage, a "Download CSV" button will appear below the table.
   - Click the "Download CSV" button to download the allocation results.
   - The downloaded CSV file will include the same columns as displayed in the table (Group ID, Hostel Name, Room Number, and Members Allocated).

  



### Example CSV Formats

- **Group Information CSV:**

  ```
  Group ID, Members, Gender
  101, 3, Boys
  102, 4, Girls
  103, 2, Boys
  104, 5, Girls
  105, 8, 5 Boys & 3 Girls
  ```

- **Hostel Information CSV:**

  ```
  Hostel Name, Capacity, Gender
  Boys Hostel A, 10, Boys
  Girls Hostel B, 8, Girls
  ```
