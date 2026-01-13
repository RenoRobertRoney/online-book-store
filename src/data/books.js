const books = [
/* =========================
   FICTION – FANTASY (1–10)
========================= */
{ id: 1, title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", category: "Fantasy", price: 499, rating: 4.8, summary: "A boy discovers he is a wizard and begins his journey at Hogwarts.", image: "https://covers.openlibrary.org/b/id/7984916-L.jpg" },
{ id: 2, title: "The Hobbit", author: "J.R.R. Tolkien", category: "Fantasy", price: 599, rating: 4.7, summary: "Bilbo Baggins joins an epic quest to reclaim a lost kingdom.", image: "https://covers.openlibrary.org/b/id/6979861-L.jpg" },
{ id: 3, title: "The Name of the Wind", author: "Patrick Rothfuss", category: "Fantasy", price: 699, rating: 4.6, summary: "A legendary magician recounts his life story.", image: "https://covers.openlibrary.org/b/id/8231851-L.jpg" },
{ id: 4, title: "Mistborn", author: "Brandon Sanderson", category: "Fantasy", price: 649, rating: 4.7, summary: "A world where magic comes from metals and rebellion rises.", image: "https://covers.openlibrary.org/b/id/7222246-L.jpg" },
{ id: 5, title: "The Way of Kings", author: "Brandon Sanderson", category: "Fantasy", price: 799, rating: 4.9, summary: "Epic fantasy of war, honor, and destiny.", image: "https://covers.openlibrary.org/b/id/8101346-L.jpg" },
{ id: 6, title: "Eragon", author: "Christopher Paolini", category: "Fantasy", price: 499, rating: 4.3, summary: "A farm boy discovers a dragon egg.", image: "https://covers.openlibrary.org/b/id/8155423-L.jpg" },
{ id: 7, title: "Wheel of Time", author: "Robert Jordan", category: "Fantasy", price: 699, rating: 4.5, summary: "A vast fantasy saga of good versus evil.", image: "https://covers.openlibrary.org/b/id/8311991-L.jpg" },
{ id: 8, title: "The Lion, the Witch and the Wardrobe", author: "C.S. Lewis", category: "Fantasy", price: 399, rating: 4.6, summary: "Children enter a magical land through a wardrobe.", image: "https://covers.openlibrary.org/b/id/8231995-L.jpg" },
{ id: 9, title: "American Gods", author: "Neil Gaiman", category: "Fantasy", price: 549, rating: 4.4, summary: "Old gods battle new gods in modern America.", image: "https://covers.openlibrary.org/b/id/8161441-L.jpg" },
{ id: 10, title: "The Last Unicorn", author: "Peter S. Beagle", category: "Fantasy", price: 399, rating: 4.2, summary: "A unicorn searches for her lost kind.", image: "https://covers.openlibrary.org/b/id/9870016-L.jpg" },

/* =========================
   FICTION – ROMANCE (11–20)
========================= */
{ id: 11, title: "Pride and Prejudice", author: "Jane Austen", category: "Romance", price: 399, rating: 4.8, summary: "A classic love story of manners and misunderstandings.", image: "https://covers.openlibrary.org/b/id/8231856-L.jpg" },
{ id: 12, title: "Me Before You", author: "Jojo Moyes", category: "Romance", price: 450, rating: 4.4, summary: "A touching story of love and life choices.", image: "https://covers.openlibrary.org/b/id/8369251-L.jpg" },
{ id: 13, title: "The Notebook", author: "Nicholas Sparks", category: "Romance", price: 499, rating: 4.5, summary: "A timeless love story.", image: "https://covers.openlibrary.org/b/id/7222161-L.jpg" },
{ id: 14, title: "Outlander", author: "Diana Gabaldon", category: "Romance", price: 599, rating: 4.6, summary: "Romance across time.", image: "https://covers.openlibrary.org/b/id/8159413-L.jpg" },
{ id: 15, title: "Jane Eyre", author: "Charlotte Brontë", category: "Romance", price: 399, rating: 4.7, summary: "A governess finds love and independence.", image: "https://covers.openlibrary.org/b/id/7984911-L.jpg" },
{ id: 16, title: "Twilight", author: "Stephenie Meyer", category: "Romance", price: 449, rating: 3.9, summary: "A romance between a girl and a vampire.", image: "https://covers.openlibrary.org/b/id/8101356-L.jpg" },
{ id: 17, title: "Love & Other Words", author: "Christina Lauren", category: "Romance", price: 399, rating: 4.3, summary: "Second chances at love.", image: "https://covers.openlibrary.org/b/id/8370226-L.jpg" },
{ id: 18, title: "The Time Traveler's Wife", author: "Audrey Niffenegger", category: "Romance", price: 499, rating: 4.4, summary: "Love transcending time.", image: "https://covers.openlibrary.org/b/id/8155424-L.jpg" },
{ id: 19, title: "Beach Read", author: "Emily Henry", category: "Romance", price: 399, rating: 4.2, summary: "Writers with opposite styles fall in love.", image: "https://covers.openlibrary.org/b/id/8311999-L.jpg" },
{ id: 20, title: "It Ends With Us", author: "Colleen Hoover", category: "Romance", price: 450, rating: 4.6, summary: "A powerful emotional romance.", image: "https://covers.openlibrary.org/b/id/9870011-L.jpg" },

/* =========================
   FICTION – SCI-FI (21–30)
========================= */
{ id: 21, title: "Dune", author: "Frank Herbert", category: "Sci-Fi", price: 649, rating: 4.8, summary: "Politics and power on a desert planet.", image: "https://covers.openlibrary.org/b/id/8101356-L.jpg" },
{ id: 22, title: "Foundation", author: "Isaac Asimov", category: "Sci-Fi", price: 499, rating: 4.6, summary: "The fall and rise of civilizations.", image: "https://covers.openlibrary.org/b/id/7222246-L.jpg" },
{ id: 23, title: "Ender's Game", author: "Orson Scott Card", category: "Sci-Fi", price: 449, rating: 4.5, summary: "A child trained to save humanity.", image: "https://covers.openlibrary.org/b/id/8235116-L.jpg" },
{ id: 24, title: "Neuromancer", author: "William Gibson", category: "Sci-Fi", price: 399, rating: 4.2, summary: "Cyberpunk classic.", image: "https://covers.openlibrary.org/b/id/8155426-L.jpg" },
{ id: 25, title: "The Martian", author: "Andy Weir", category: "Sci-Fi", price: 499, rating: 4.7, summary: "An astronaut stranded on Mars.", image: "https://covers.openlibrary.org/b/id/8311995-L.jpg" },
{ id: 26, title: "Snow Crash", author: "Neal Stephenson", category: "Sci-Fi", price: 450, rating: 4.3, summary: "Virtual reality meets ancient myths.", image: "https://covers.openlibrary.org/b/id/7984918-L.jpg" },
{ id: 27, title: "Brave New World", author: "Aldous Huxley", category: "Sci-Fi", price: 399, rating: 4.4, summary: "A dystopian future society.", image: "https://covers.openlibrary.org/b/id/8161443-L.jpg" },
{ id: 28, title: "1984", author: "George Orwell", category: "Sci-Fi", price: 349, rating: 4.7, summary: "A surveillance state nightmare.", image: "https://covers.openlibrary.org/b/id/8231997-L.jpg" },
{ id: 29, title: "The Expanse", author: "James S.A. Corey", category: "Sci-Fi", price: 699, rating: 4.5, summary: "Space politics and mystery.", image: "https://covers.openlibrary.org/b/id/9870021-L.jpg" },
{ id: 30, title: "Do Androids Dream of Electric Sheep?", author: "Philip K. Dick", category: "Sci-Fi", price: 399, rating: 4.1, summary: "What does it mean to be human?", image: "https://covers.openlibrary.org/b/id/8311992-L.jpg" },

/* =========================
   NON-FICTION – SELF-HELP (31–40)
========================= */
{ id: 31, title: "Atomic Habits", author: "James Clear", category: "Self-Help", price: 450, rating: 4.8, summary: "Build good habits, break bad ones.", image: "https://covers.openlibrary.org/b/id/10594715-L.jpg" },
{ id: 32, title: "The Power of Now", author: "Eckhart Tolle", category: "Self-Help", price: 399, rating: 4.6, summary: "Living in the present moment.", image: "https://covers.openlibrary.org/b/id/8311991-L.jpg" },
{ id: 33, title: "Think and Grow Rich", author: "Napoleon Hill", category: "Self-Help", price: 299, rating: 4.5, summary: "Success mindset principles.", image: "https://covers.openlibrary.org/b/id/8231854-L.jpg" },
{ id: 34, title: "Deep Work", author: "Cal Newport", category: "Self-Help", price: 499, rating: 4.7, summary: "Focus in a distracted world.", image: "https://covers.openlibrary.org/b/id/8155421-L.jpg" },
{ id: 35, title: "7 Habits of Highly Effective People", author: "Stephen Covey", category: "Self-Help", price: 550, rating: 4.6, summary: "Personal effectiveness guide.", image: "https://covers.openlibrary.org/b/id/9870019-L.jpg" },

/* =========================
   TECHNOLOGY (41–50)
========================= */
{ id: 41, title: "Clean Code", author: "Robert C. Martin", category: "Technology", price: 699, rating: 4.9, summary: "Writing readable and maintainable code.", image: "https://covers.openlibrary.org/b/id/9641981-L.jpg" },
{ id: 42, title: "The Pragmatic Programmer", author: "Andrew Hunt", category: "Technology", price: 750, rating: 4.8, summary: "Best practices for developers.", image: "https://covers.openlibrary.org/b/id/8099256-L.jpg" },
{ id: 43, title: "You Don't Know JS", author: "Kyle Simpson", category: "Technology", price: 499, rating: 4.6, summary: "Deep dive into JavaScript.", image: "https://covers.openlibrary.org/b/id/8155429-L.jpg" },
{ id: 44, title: "Design Patterns", author: "Erich Gamma", category: "Technology", price: 899, rating: 4.7, summary: "Reusable object-oriented solutions.", image: "https://covers.openlibrary.org/b/id/8311998-L.jpg" },
{ id: 45, title: "Introduction to Algorithms", author: "Thomas H. Cormen", category: "Technology", price: 999, rating: 4.5, summary: "Algorithms explained.", image: "https://covers.openlibrary.org/b/id/8231999-L.jpg" },

/* =========================
   MANGA & COMICS (51–60)
========================= */
{ id: 51, title: "Naruto Vol. 1", author: "Masashi Kishimoto", category: "Manga", price: 299, rating: 4.6, summary: "A ninja dreams of greatness.", image: "https://covers.openlibrary.org/b/id/9870016-L.jpg" },
{ id: 52, title: "Attack on Titan Vol. 1", author: "Hajime Isayama", category: "Manga", price: 349, rating: 4.8, summary: "Humanity vs giants.", image: "https://covers.openlibrary.org/b/id/8235116-L.jpg" },
{ id: 53, title: "One Piece Vol. 1", author: "Eiichiro Oda", category: "Manga", price: 299, rating: 4.7, summary: "Pirates seek ultimate treasure.", image: "https://covers.openlibrary.org/b/id/8155425-L.jpg" },
{ id: 54, title: "Batman: Year One", author: "Frank Miller", category: "Comics", price: 399, rating: 4.6, summary: "The origin of Batman.", image: "https://covers.openlibrary.org/b/id/8311993-L.jpg" },
{ id: 55, title: "Watchmen", author: "Alan Moore", category: "Comics", price: 499, rating: 4.9, summary: "Deconstruction of superheroes.", image: "https://covers.openlibrary.org/b/id/8231859-L.jpg" },

/* =========================
   TRAVEL / PHILOSOPHY / ARTS (61–70)
========================= */
{ id: 61, title: "Lonely Planet Japan", author: "Lonely Planet", category: "Travel", price: 799, rating: 4.5, summary: "Explore Japan.", image: "https://covers.openlibrary.org/b/id/8159413-L.jpg" },
{ id: 62, title: "Into the Wild", author: "Jon Krakauer", category: "Travel", price: 499, rating: 4.6, summary: "A journey into nature.", image: "https://covers.openlibrary.org/b/id/7984919-L.jpg" },
{ id: 63, title: "Meditations", author: "Marcus Aurelius", category: "Philosophy", price: 299, rating: 4.7, summary: "Stoic philosophy.", image: "https://covers.openlibrary.org/b/id/8231995-L.jpg" },
{ id: 64, title: "The Republic", author: "Plato", category: "Philosophy", price: 349, rating: 4.4, summary: "Justice and ideal society.", image: "https://covers.openlibrary.org/b/id/8161441-L.jpg" },
{ id: 65, title: "The Story of Art", author: "E.H. Gombrich", category: "Arts", price: 550, rating: 4.6, summary: "History of art.", image: "https://covers.openlibrary.org/b/id/9870017-L.jpg" },


/* =========================
   CHILDREN & YA (71–80)
========================= */
{ id: 71, title: "Charlotte's Web", author: "E.B. White", category: "Children", price: 299, rating: 4.7, summary: "Friendship and kindness.", image: "https://covers.openlibrary.org/b/id/7984912-L.jpg" },
{ id: 72, title: "Matilda", author: "Roald Dahl", category: "Children", price: 299, rating: 4.8, summary: "A gifted girl changes her fate.", image: "https://covers.openlibrary.org/b/id/8101354-L.jpg" },
{ id: 73, title: "The Hunger Games", author: "Suzanne Collins", category: "Young Adult", price: 450, rating: 4.6, summary: "Survival in a dystopian future.", image: "https://covers.openlibrary.org/b/id/8231853-L.jpg" },
{ id: 74, title: "Divergent", author: "Veronica Roth", category: "Young Adult", price: 399, rating: 4.4, summary: "A divided society.", image: "https://covers.openlibrary.org/b/id/8155427-L.jpg" },

/* =========================
   BUSINESS / COOKING / SCIENCE (81–100)
========================= */
{ id: 81, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", category: "Business", price: 499, rating: 4.5, summary: "Financial education.", image: "https://covers.openlibrary.org/b/id/8311994-L.jpg" },
{ id: 82, title: "Zero to One", author: "Peter Thiel", category: "Business", price: 550, rating: 4.4, summary: "Startup innovation.", image: "https://covers.openlibrary.org/b/id/8231852-L.jpg" },
{ id: 83, title: "A Brief History of Time", author: "Stephen Hawking", category: "Science", price: 599, rating: 4.6, summary: "Understanding the universe.", image: "https://covers.openlibrary.org/b/id/8155428-L.jpg" },
{ id: 84, title: "The Selfish Gene", author: "Richard Dawkins", category: "Science", price: 550, rating: 4.5, summary: "Evolution explained.", image: "https://covers.openlibrary.org/b/id/8311996-L.jpg" },

/* =========================
   HORROR (85–89)
========================= */
{ id: 85, title: "The Shining", author: "Stephen King", category: "Horror", price: 499, rating: 4.7, summary: "A family faces terrifying supernatural forces in a remote hotel.", image: "https://covers.openlibrary.org/b/id/8231996-L.jpg" },
{ id: 86, title: "Dracula", author: "Bram Stoker", category: "Horror", price: 399, rating: 4.6, summary: "The original vampire horror novel.", image: "https://covers.openlibrary.org/b/id/8084416-L.jpg" },
{ id: 87, title: "It", author: "Stephen King", category: "Horror", price: 599, rating: 4.5, summary: "A group of friends confront an ancient evil.", image: "https://covers.openlibrary.org/b/id/8235082-L.jpg" },
{ id: 88, title: "Frankenstein", author: "Mary Shelley", category: "Horror", price: 349, rating: 4.4, summary: "A scientist creates a terrifying creature.", image: "https://covers.openlibrary.org/b/id/7984913-L.jpg" },
{ id: 89, title: "The Exorcist", author: "William Peter Blatty", category: "Horror", price: 450, rating: 4.3, summary: "A young girl is possessed by a demon.", image: "https://covers.openlibrary.org/b/id/9870015-L.jpg" },

/* =========================
   MYSTERY (90–94)
========================= */
{ id: 90, title: "Murder on the Orient Express", author: "Agatha Christie", category: "Mystery", price: 399, rating: 4.8, summary: "A murder mystery aboard a luxury train.", image: "https://covers.openlibrary.org/b/id/8231857-L.jpg" },
{ id: 91, title: "Gone Girl", author: "Gillian Flynn", category: "Mystery", price: 499, rating: 4.6, summary: "A psychological thriller about a missing wife.", image: "https://covers.openlibrary.org/b/id/7222247-L.jpg" },
{ id: 92, title: "The Silent Patient", author: "Alex Michaelides", category: "Mystery", price: 550, rating: 4.5, summary: "A woman stops speaking after a violent crime.", image: "https://covers.openlibrary.org/b/id/10594713-L.jpg" },
{ id: 93, title: "Sherlock Holmes: The Complete Novels", author: "Arthur Conan Doyle", category: "Mystery", price: 699, rating: 4.7, summary: "Classic detective mysteries.", image: "https://covers.openlibrary.org/b/id/8101349-L.jpg" },
{ id: 94, title: "The Girl with the Dragon Tattoo", author: "Stieg Larsson", category: "Mystery", price: 599, rating: 4.4, summary: "A journalist uncovers dark secrets.", image: "https://covers.openlibrary.org/b/id/8311997-L.jpg" },

/* =========================
   LITERARY (95–99)
========================= */
{ id: 95, title: "To Kill a Mockingbird", author: "Harper Lee", category: "Literary", price: 399, rating: 4.9, summary: "A story of justice and morality.", image: "https://covers.openlibrary.org/b/id/8228691-L.jpg" },
{ id: 96, title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Literary", price: 349, rating: 4.5, summary: "A critique of the American Dream.", image: "https://covers.openlibrary.org/b/id/7222245-L.jpg" },
{ id: 97, title: "1984", author: "George Orwell", category: "Literary", price: 399, rating: 4.8, summary: "A dystopian future under total surveillance.", image: "https://covers.openlibrary.org/b/id/8231997-L.jpg" },
{ id: 98, title: "The Catcher in the Rye", author: "J.D. Salinger", category: "Literary", price: 349, rating: 4.2, summary: "A teenager's rebellion and confusion.", image: "https://covers.openlibrary.org/b/id/7984914-L.jpg" },
{ id: 99, title: "Life of Pi", author: "Yann Martel", category: "Literary", price: 499, rating: 4.6, summary: "A survival story with deep symbolism.", image: "https://covers.openlibrary.org/b/id/8231855-L.jpg" },

/* =========================
   BIOGRAPHY (100–104)
========================= */
{ id: 100, title: "Wings of Fire", author: "A.P.J. Abdul Kalam", category: "Biography", price: 399, rating: 4.8, summary: "Autobiography of India's Missile Man.", image: "https://covers.openlibrary.org/b/id/8231993-L.jpg" },
{ id: 101, title: "The Diary of a Young Girl", author: "Anne Frank", category: "Biography", price: 299, rating: 4.7, summary: "Life during World War II.", image: "https://covers.openlibrary.org/b/id/7984910-L.jpg" },
{ id: 102, title: "Steve Jobs", author: "Walter Isaacson", category: "Biography", price: 699, rating: 4.6, summary: "Life of Apple’s visionary founder.", image: "https://covers.openlibrary.org/b/id/8311990-L.jpg" },
{ id: 103, title: "Becoming", author: "Michelle Obama", category: "Biography", price: 599, rating: 4.7, summary: "An inspiring personal journey.", image: "https://covers.openlibrary.org/b/id/10594714-L.jpg" },
{ id: 104, title: "Long Walk to Freedom", author: "Nelson Mandela", category: "Biography", price: 650, rating: 4.8, summary: "Mandela’s struggle against apartheid.", image: "https://covers.openlibrary.org/b/id/8231858-L.jpg" },

/* =========================
   HISTORY (105–109)
========================= */
{ id: 105, title: "Sapiens", author: "Yuval Noah Harari", category: "History", price: 699, rating: 4.8, summary: "A brief history of humankind.", image: "https://covers.openlibrary.org/b/id/8155422-L.jpg" },
{ id: 106, title: "Guns, Germs, and Steel", author: "Jared Diamond", category: "History", price: 599, rating: 4.6, summary: "How geography shaped history.", image: "https://covers.openlibrary.org/b/id/8311992-L.jpg" },
{ id: 107, title: "The Silk Roads", author: "Peter Frankopan", category: "History", price: 650, rating: 4.5, summary: "A new history of the world.", image: "https://covers.openlibrary.org/b/id/9870020-L.jpg" },
{ id: 108, title: "Postwar", author: "Tony Judt", category: "History", price: 799, rating: 4.4, summary: "Europe after World War II.", image: "https://covers.openlibrary.org/b/id/8231994-L.jpg" },
{ id: 109, title: "The Crusades", author: "Thomas Asbridge", category: "History", price: 599, rating: 4.3, summary: "The epic history of the Crusades.", image: "https://covers.openlibrary.org/b/id/8311993-L.jpg" }


];

export default books;
