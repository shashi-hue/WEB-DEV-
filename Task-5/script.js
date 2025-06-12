
        class BookStore {
            constructor() {
                this.books = [];
                this.cart = [];
                this.filteredBooks = [];
                this.isLoading = false;
                this.searchTerm = '';
                this.filters = {
                    category: '',
                    priceRange: '',
                    sortBy: 'title'
                };
                
                this.init();
            }

            async init() {
                await this.loadBooks();
                this.setupEventListeners();
                this.renderProducts();
                this.updateCartUI();
            }

            async loadBooks() {
                this.isLoading = true;
                
                // Simulate API call with sample data
                return new Promise(resolve => {
                    setTimeout(() => {
                        this.books = [
                            {
                                id: 1,
                                title: "The Midnight Library",
                                author: "Matt Haig",
                                category: "fiction",
                                price: 24.99,
                                rating: 4.5,
                                reviews: 1250,
                                image: "📖",
                                description: "A dazzling novel about all the choices that go into a life well lived."
                            },
                            {
                                id: 2,
                                title: "Educated",
                                author: "Tara Westover",
                                category: "biography",
                                price: 18.99,
                                rating: 4.8,
                                reviews: 2100,
                                image: "📚",
                                description: "A powerful memoir about education, family, and the struggle for self-invention."
                            },
                            {
                                id: 3,
                                title: "The Seven Husbands of Evelyn Hugo",
                                author: "Taylor Jenkins Reid",
                                category: "fiction",
                                price: 16.99,
                                rating: 4.7,
                                reviews: 3200,
                                image: "💄",
                                description: "A riveting novel about a reclusive Hollywood icon and her tumultuous life."
                            },
                            {
                                id: 4,
                                title: "Atomic Habits",
                                author: "James Clear",
                                category: "non-fiction",
                                price: 21.99,
                                rating: 4.6,
                                reviews: 1800,
                                image: "⚛️",
                                description: "The life-changing million-copy bestseller on the science of habit formation."
                            },
                            {
                                id: 5,
                                title: "The Silent Patient",
                                author: "Alex Michaelides",
                                category: "mystery",
                                price: 19.99,
                                rating: 4.3,
                                reviews: 1650,
                                image: "🔍",
                                description: "A shocking psychological thriller of a woman's act of violence against her husband."
                            },
                            {
                                id: 6,
                                title: "Klara and the Sun",
                                author: "Kazuo Ishiguro",
                                category: "sci-fi",
                                price: 26.99,
                                rating: 4.2,
                                reviews: 980,
                                image: "🌅",
                                description: "A thrilling book that offers a look at our changing world through the eyes of an artificial friend."
                            },
                            {
                                id: 7,
                                title: "The Vanishing Half",
                                author: "Brit Bennett",
                                category: "fiction",
                                price: 22.99,
                                rating: 4.4,
                                reviews: 1420,
                                image: "👥",
                                description: "A stunning new novel about twin sisters, inseparable as children."
                            },
                            {
                                 id: 8,
                                title: "Where the Crawdads Sing",
                                author: "Delia Owens",
                                category: "mystery",
                                price: 17.99,
                                rating: 4.6,
                                reviews: 2800,
                                image: "🦢",
                                description: "A coming-of-age story and murder mystery set in the marshlands of North Carolina."
                            },
                            {
                                id: 9,
                                title: "It Ends with Us",
                                author: "Colleen Hoover",
                                category: "romance",
                                price: 15.99,
                                rating: 4.5,
                                reviews: 2650,
                                image: "💕",
                                description: "A bold and unflinching novel about the complexities of love and resilience."
                            },
                            {
                                id: 10,
                                title: "Becoming",
                                author: "Michelle Obama",
                                category: "biography",
                                price: 29.99,
                                rating: 4.9,
                                reviews: 4200,
                                image: "👑",
                                description: "An intimate, powerful memoir by the former First Lady of the United States."
                            },
                            {
                                id: 11,
                                title: "The Thursday Murder Club",
                                author: "Richard Osman",
                                category: "mystery",
                                price: 20.99,
                                rating: 4.3,
                                reviews: 1340,
                                image: "🕵️",
                                description: "Four unlikely friends meet weekly to investigate cold cases."
                            },
                            {
                                id: 12,
                                title: "Project Hail Mary",
                                author: "Andy Weir",
                                category: "sci-fi",
                                price: 25.99,
                                rating: 4.7,
                                reviews: 1560,
                                image: "🚀",
                                description: "A lone astronaut must save the earth from disaster in this irresistible interstellar adventure."
                            }
                        ];
                        
                        this.filteredBooks = [...this.books];
                        this.isLoading = false;
                        resolve();
                    }, 1000);
                });
            }

            setupEventListeners() {
                // Search functionality
                const searchInput = document.getElementById('searchInput');
                const searchBtn = document.getElementById('searchBtn');
                
                searchInput.addEventListener('input', debounce((e) => {
                    this.searchTerm = e.target.value.toLowerCase();
                    this.applyFilters();
                }, 300));
                
                searchBtn.addEventListener('click', () => {
                    this.searchTerm = searchInput.value.toLowerCase();
                    this.applyFilters();
                });

                // Filter functionality
                document.getElementById('categoryFilter').addEventListener('change', (e) => {
                    this.filters.category = e.target.value;
                    this.applyFilters();
                });

                document.getElementById('priceFilter').addEventListener('change', (e) => {
                    this.filters.priceRange = e.target.value;
                    this.applyFilters();
                });

                document.getElementById('sortFilter').addEventListener('change', (e) => {
                    this.filters.sortBy = e.target.value;
                    this.applyFilters();
                });

                // Cart functionality
                document.getElementById('cartBtn').addEventListener('click', () => {
                    this.showCart();
                });

                document.getElementById('closeCart').addEventListener('click', () => {
                    this.hideCart();
                });

                document.getElementById('checkoutBtn').addEventListener('click', () => {
                    this.checkout();
                });

                // Modal click outside to close
                document.getElementById('cartModal').addEventListener('click', (e) => {
                    if (e.target.id === 'cartModal') {
                        this.hideCart();
                    }
                });

                // Keyboard navigation
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') {
                        this.hideCart();
                    }
                });

                // Performance: Lazy loading simulation
                window.addEventListener('scroll', throttle(() => {
                    this.handleScroll();
                }, 100));
            }

            applyFilters() {
                let filtered = [...this.books];

                // Apply search filter
                if (this.searchTerm) {
                    filtered = filtered.filter(book => 
                        book.title.toLowerCase().includes(this.searchTerm) ||
                        book.author.toLowerCase().includes(this.searchTerm) ||
                        book.category.toLowerCase().includes(this.searchTerm)
                    );
                }

                // Apply category filter
                if (this.filters.category) {
                    filtered = filtered.filter(book => book.category === this.filters.category);
                }

                // Apply price filter
                if (this.filters.priceRange) {
                    const [min, max] = this.filters.priceRange.split('-').map(Number);
                    filtered = filtered.filter(book => {
                        if (max) {
                            return book.price >= min && book.price <= max;
                        } else {
                            return book.price >= min;
                        }
                    });
                }

                // Apply sorting
                filtered.sort((a, b) => {
                    switch (this.filters.sortBy) {
                        case 'price-low':
                            return a.price - b.price;
                        case 'price-high':
                            return b.price - a.price;
                        case 'rating':
                            return b.rating - a.rating;
                        case 'author':
                            return a.author.localeCompare(b.author);
                        case 'title':
                        default:
                            return a.title.localeCompare(b.title);
                    }
                });

                this.filteredBooks = filtered;
                this.renderProducts();
            }

            renderProducts() {
                const grid = document.getElementById('productsGrid');
                const noResults = document.getElementById('noResults');

                if (this.filteredBooks.length === 0) {
                    grid.style.display = 'none';
                    noResults.style.display = 'block';
                    return;
                }

                grid.style.display = 'grid';
                noResults.style.display = 'none';

                grid.innerHTML = this.filteredBooks.map(book => `
                    <article class="product-card" data-book-id="${book.id}">
                        <div class="product-image" aria-label="Book cover for ${book.title}">
                            ${book.image}
                        </div>
                        <div class="product-info">
                            <h3 class="product-title">${escapeHtml(book.title)}</h3>
                            <p class="product-author">by ${escapeHtml(book.author)}</p>
                            <span class="product-category">${book.category.charAt(0).toUpperCase() + book.category.slice(1)}</span>
                            <div class="product-price">${book.price.toFixed(2)}</div>
                            <div class="product-rating">
                                <span class="stars" aria-label="Rating ${book.rating} out of 5">
                                    ${'★'.repeat(Math.floor(book.rating))}${'☆'.repeat(5 - Math.floor(book.rating))}
                                </span>
                                <span class="rating-text">(${book.reviews} reviews)</span>
                            </div>
                            <button class="add-to-cart" onclick="bookStore.addToCart(${book.id})" aria-label="Add ${book.title} to cart">
                                Add to Cart
                            </button>
                        </div>
                    </article>
                `).join('');

                // Add click handlers for product cards
                grid.querySelectorAll('.product-card').forEach(card => {
                    card.addEventListener('click', (e) => {
                        if (!e.target.classList.contains('add-to-cart')) {
                            const bookId = parseInt(card.dataset.bookId);
                            this.showBookDetails(bookId);
                        }
                    });
                });
            }

            addToCart(bookId) {
                const book = this.books.find(b => b.id === bookId);
                if (!book) return;

                const existingItem = this.cart.find(item => item.id === bookId);
                
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    this.cart.push({
                        ...book,
                        quantity: 1
                    });
                }

                this.updateCartUI();
                this.showNotification(`"${book.title}" added to cart!`);
            }

            removeFromCart(bookId) {
                this.cart = this.cart.filter(item => item.id !== bookId);
                this.updateCartUI();
                this.renderCart();
            }

            updateQuantity(bookId, change) {
                const item = this.cart.find(item => item.id === bookId);
                if (!item) return;

                item.quantity += change;
                
                if (item.quantity <= 0) {
                    this.removeFromCart(bookId);
                } else {
                    this.updateCartUI();
                    this.renderCart();
                }
            }

            updateCartUI() {
                const cartCount = document.getElementById('cartCount');
                const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
                cartCount.textContent = totalItems;
                
                // Animate cart count
                if (totalItems > 0) {
                    cartCount.style.display = 'flex';
                    cartCount.style.animation = 'none';
                    setTimeout(() => {
                        cartCount.style.animation = 'pulse 0.5s ease-in-out';
                    }, 10);
                } else {
                    cartCount.style.display = 'none';
                }
            }

            showCart() {
                const modal = document.getElementById('cartModal');
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
                this.renderCart();
                
                // Focus management for accessibility
                document.getElementById('closeCart').focus();
            }

            hideCart() {
                const modal = document.getElementById('cartModal');
                modal.classList.remove('show');
                document.body.style.overflow = '';
                
                // Return focus to cart button
                document.getElementById('cartBtn').focus();
            }

            renderCart() {
                const cartItems = document.getElementById('cartItems');
                const cartTotal = document.getElementById('cartTotal');

                if (this.cart.length === 0) {
                    cartItems.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">Your cart is empty</p>';
                    cartTotal.textContent = 'Total: $0.00';
                    return;
                }

                cartItems.innerHTML = this.cart.map(item => `
                    <div class="cart-item">
                        <div class="cart-item-image">${item.image}</div>
                        <div class="cart-item-info">
                            <div class="cart-item-title">${escapeHtml(item.title)}</div>
                            <div class="cart-item-price">${item.price.toFixed(2)}</div>
                            <div class="quantity-controls">
                                <button class="quantity-btn" onclick="bookStore.updateQuantity(${item.id}, -1)" aria-label="Decrease quantity">-</button>
                                <span class="quantity">${item.quantity}</span>
                                <button class="quantity-btn" onclick="bookStore.updateQuantity(${item.id}, 1)" aria-label="Increase quantity">+</button>
                            </div>
                            <button class="remove-item" onclick="bookStore.removeFromCart(${item.id})" aria-label="Remove ${item.title} from cart">
                                Remove
                            </button>
                        </div>
                    </div>
                `).join('');

                const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                cartTotal.textContent = `Total: ${total.toFixed(2)}`;
            }

            checkout() {
                if (this.cart.length === 0) {
                    this.showNotification('Your cart is empty!', 'error');
                    return;
                }

                const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                const itemCount = this.cart.reduce((sum, item) => sum + item.quantity, 0);
                
                // Simulate checkout process
                this.showNotification('Processing your order...', 'info');
                
                setTimeout(() => {
                    this.cart = [];
                    this.updateCartUI();
                    this.hideCart();
                    this.showNotification(`Order placed successfully! Total: ${total.toFixed(2)} for ${itemCount} items.`, 'success');
                }, 2000);
            }

            showBookDetails(bookId) {
                const book = this.books.find(b => b.id === bookId);
                if (!book) return;

                // Simple book details display (could be expanded to full modal)
                this.showNotification(`${book.title} by ${book.author} - ${book.description}`, 'info', 5000);
            }

            showNotification(message, type = 'success', duration = 3000) {
                // Create notification element
                const notification = document.createElement('div');
                notification.className = `notification notification-${type}`;
                notification.textContent = message;
                
                // Add styles
                Object.assign(notification.style, {
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    padding: '1rem 1.5rem',
                    borderRadius: 'var(--border-radius)',
                    color: 'white',
                    fontWeight: '500',
                    zIndex: '3000',
                    maxWidth: '400px',
                    boxShadow: 'var(--shadow-lg)',
                    animation: 'slideInRight 0.3s ease-out',
                    backgroundColor: type === 'error' ? '#ef4444' : 
                                   type === 'info' ? '#3b82f6' : '#10b981'
                });

                document.body.appendChild(notification);

                // Auto remove
                setTimeout(() => {
                    notification.style.animation = 'slideOutRight 0.3s ease-in';
                    setTimeout(() => {
                        if (notification.parentNode) {
                            notification.parentNode.removeChild(notification);
                        }
                    }, 300);
                }, duration);
            }

            handleScroll() {
                // Lazy loading simulation - could be expanded for infinite scroll
                const scrollPosition = window.scrollY + window.innerHeight;
                const documentHeight = document.documentElement.scrollHeight;
                
                if (scrollPosition >= documentHeight - 100) {
                    // Could load more products here
                    console.log('Near bottom - could load more products');
                }
            }
        }

        // Utility Functions
        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }

        function throttle(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        }

        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        // Add notification animations to CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // Initialize the application
        let bookStore;
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                bookStore = new BookStore();
            });
        } else {
            bookStore = new BookStore();
        }

        // Service Worker Registration for Performance (if supported)
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                // Service worker would go here for caching
                console.log('Service Worker support detected');
            });
        }

        // Performance monitoring
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
            
            // Could send analytics here
            if (loadTime > 3000) {
                console.warn('Page load time is slow');
            }
        });

        // Error handling
        window.addEventListener('error', (e) => {
            console.error('Application error:', e.error);
            // Could send error reports here
        });

        // Unhandled promise rejections
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            e.preventDefault();
        });