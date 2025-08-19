# Transcript Snippets - Technical Screen

Welcome! This is a Rails/React coding exercise designed to assess your full-stack development skills.

## 🎯 Objective

Build a web application that allows users to:
1. Import transcript data from JSON
2. View transcript snippets with timestamps
3. Mark snippets for review
4. Search snippets by text content

## 🚀 Getting Started

### Prerequisites
- Ruby 3.3+
- Node.js 18+
- SQLite3

### Setup Instructions

```bash
# 1. Install dependencies
bundle install
npm install

# 2. Setup database
bin/rails db:create db:migrate

# 3. Start the servers (in separate terminals)
bin/rails s       # Terminal 1: Rails server on http://localhost:3000
bin/vite dev      # Terminal 2: Vite dev server for React
```

Visit http://localhost:3000 to see the application.

## 📝 Development Notes

- **Use any tools or resources** that help you be productive
- Focus on writing **readable, maintainable code** 
- Be prepared to **explain your implementation decisions** during our follow-up discussion
- Code quality and understanding matter more than speed

## 📋 Requirements

### Core Features (Priority Order)

- [ ] **Import Transcript**
    - Accept JSON file upload or paste
    - Parse and validate the JSON structure
    - Create transcript and snippet records in database
    - Handle errors gracefully

- [ ] **Display Snippets**
    - List all snippets for a transcript
    - Show start/end timestamps for each snippet
    - Display snippet text content
    - Order by start time

- [ ] **Toggle Review Status**
    - Add checkbox or button to toggle `needs_review` flag
    - Update backend via API call
    - Reflect changes in UI immediately

- [ ] **Search Functionality**
    - Add search input field
    - Filter snippets by text content
    - Can be client-side or server-side
    - Case-insensitive search preferred

### Bonus Features (If Time Permits)
- Keyboard navigation (j/k to move between snippets)
- Highlight search terms in results
- Any other features that seem interesting!

## 📁 Project Structure

```
transcript_snippets/
├── app/
│   ├── controllers/
│   │   ├── transcripts_controller.rb  # TODO: Implement create action
│   │   └── snippets_controller.rb     # TODO: Implement index and update
│   ├── models/
│   │   ├── transcript.rb              # TODO: Add associations/validations
│   │   └── snippet.rb                  # TODO: Add associations/validations/search
│   └── frontend/
│       ├── entrypoints/
│       │   └── application.jsx        # Main React app (starter code provided)
│       └── lib/
│           └── api.js                  # TODO: Implement API client functions
├── config/
│   └── routes.rb                       # Routes are configured
├── db/
│   └── migrate/                        # Migrations are ready
├── spec/
│   ├── models/
│   ├── requests/
│   └── ...
└── test_data/
    ├── sample_transcript.json          # Clean sample data
    ├── large_transcript.json           # Performance testing
    └── malformed_transcript.json       # Error handling
```

## 🔧 API Endpoints

### POST /transcripts
Create a new transcript with snippets.

**Request:**
```json
{
  "title": "Meeting Title",
  "snippets": [
    {
      "start": 0.5,
      "end": 5.2,
      "text": "Hello world"
    }
  ]
}
```

**Response:**
```json
{
  "id": 42
}
```

### GET /transcripts/:transcript_id/snippets
List all snippets for a transcript, with optional search.

**Query Parameters:**
- `query` (optional): Search term to filter snippets

**Response:**
```json
[
  {
    "id": 1,
    "start": 0.5,
    "end": 5.2,
    "text": "Hello world",
    "needs_review": false
  }
]
```

### PATCH /snippets/:id
Update a snippet's review status.

**Request:**
```json
{
  "needs_review": true
}
```

**Response:**
```json
{
  "id": 1,
  "needs_review": true
}
```

## 📊 Database Schema

### `transcripts` table
- `id` (integer, primary key)
- `title` (string, required)
- `created_at`, `updated_at` (timestamps)

### `snippets` table  
- `id` (integer, primary key)
- `transcript_id` (integer, foreign key)
- `start` (float, required)
- `end` (float, required) 
- `text` (text, required)
- `needs_review` (boolean, default: false)
- `created_at`, `updated_at` (timestamps)

## 🏁 Submission

When you're done:
1. Commit your changes locally
2. Create a pull request
3. Email stephen@sonix.ai with a link to your PR

We’ll then set up a short call to review your approach.

---

*Test data files are available in the `test_data/` directory for various testing scenarios.*
