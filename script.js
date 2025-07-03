// Supabase configuration
const SUPABASE_URL = 'https://qfjiyjsrrmprdqmomzxe.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmaml5anNycm1wcmRxbW9tenhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1MDUzMDAsImV4cCI6MjA2NzA4MTMwMH0.Wau6ZFaldGq1CzqLjJunw8I2_JurOQ_BtmOnv9zW63U';

// Initialize Supabase client
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// DOM elements
const gallery = document.getElementById('gallery');
const loading = document.getElementById('loading');
const emptyState = document.getElementById('emptyState');
const uploadBtn = document.getElementById('uploadBtn');
const fileInput = document.getElementById('fileInput');
const searchInput = document.getElementById('searchInput');
const photoModal = document.getElementById('photoModal');
const uploadModal = document.getElementById('uploadModal');
const closeModal = document.getElementById('closeModal');
const closeUploadModal = document.getElementById('closeUploadModal');
const uploadForm = document.getElementById('uploadForm');
const cancelUpload = document.getElementById('cancelUpload');

// State
let photos = [];
let currentPhoto = null;

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
});

async function initializeApp() {
    try {
        showLoading();
        await loadPhotos();
        hideLoading();
    } catch (error) {
        console.error('Error initializing app:', error);
        hideLoading();
        showError('Failed to load photos');
    }
}

function setupEventListeners() {
    // Upload button
    uploadBtn.addEventListener('click', () => {
        fileInput.click();
    });

    // File input change
    fileInput.addEventListener('change', handleFileSelect);

    // Search input
    searchInput.addEventListener('input', handleSearch);

    // Modal close buttons
    closeModal.addEventListener('click', () => {
        photoModal.style.display = 'none';
    });

    closeUploadModal.addEventListener('click', () => {
        uploadModal.style.display = 'none';
    });

    cancelUpload.addEventListener('click', () => {
        uploadModal.style.display = 'none';
    });

    // Upload form submit
    uploadForm.addEventListener('submit', handleUpload);

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === photoModal) {
            photoModal.style.display = 'none';
        }
        if (event.target === uploadModal) {
            uploadModal.style.display = 'none';
        }
    });
}

async function loadPhotos() {
    try {
        const { data, error } = await supabaseClient
            .from('photos')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            throw error;
        }

        photos = data || [];
        displayPhotos(photos);
    } catch (error) {
        console.error('Error loading photos:', error);
        showError('Failed to load photos');
    }
}

function displayPhotos(photosToDisplay) {
    gallery.innerHTML = '';

    if (photosToDisplay.length === 0) {
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';

    photosToDisplay.forEach(photo => {
        const photoCard = createPhotoCard(photo);
        gallery.appendChild(photoCard);
    });
}

function createPhotoCard(photo) {
    const card = document.createElement('div');
    card.className = 'photo-card';
    card.onclick = () => openPhotoModal(photo);

    const img = document.createElement('img');
    img.src = photo.url;
    img.alt = photo.title;
    img.loading = 'lazy';

    const info = document.createElement('div');
    info.className = 'photo-info';

    const title = document.createElement('h3');
    title.className = 'photo-title';
    title.textContent = photo.title;

    const description = document.createElement('p');
    description.className = 'photo-description';
    description.textContent = photo.description || 'No description available';

    const date = document.createElement('small');
    date.className = 'photo-date';
    date.textContent = new Date(photo.created_at).toLocaleDateString();

    info.appendChild(title);
    info.appendChild(description);
    info.appendChild(date);

    card.appendChild(img);
    card.appendChild(info);

    return card;
}

function openPhotoModal(photo) {
    currentPhoto = photo;
    
    document.getElementById('modalImage').src = photo.url;
    document.getElementById('modalTitle').textContent = photo.title;
    document.getElementById('modalDescription').textContent = photo.description || 'No description available';
    document.getElementById('modalDate').textContent = new Date(photo.created_at).toLocaleDateString();
    
    photoModal.style.display = 'block';
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        currentPhoto = { file };
        uploadModal.style.display = 'block';
    }
}

async function handleUpload(event) {
    event.preventDefault();
    
    const title = document.getElementById('photoTitle').value;
    const description = document.getElementById('photoDescription').value;
    const file = currentPhoto.file;

    if (!title || !file) {
        showError('Please provide a title and select a file');
        return;
    }

    try {
        showLoading();

        // Upload file to Supabase Storage
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `photos/${fileName}`;

        const { error: uploadError } = await supabaseClient.storage
            .from('photos')
            .upload(filePath, file);

        if (uploadError) {
            throw uploadError;
        }

        // Get public URL
        const { data: urlData } = supabaseClient.storage
            .from('photos')
            .getPublicUrl(filePath);

        // Save photo metadata to database
        const { error: dbError } = await supabaseClient
            .from('photos')
            .insert([
                {
                    title,
                    description,
                    url: urlData.publicUrl,
                    file_path: filePath,
                    created_at: new Date().toISOString()
                }
            ]);

        if (dbError) {
            throw dbError;
        }

        // Reset form and close modal
        uploadForm.reset();
        uploadModal.style.display = 'none';
        
        // Reload photos
        await loadPhotos();
        hideLoading();
        
        showSuccess('Photo uploaded successfully!');
    } catch (error) {
        console.error('Error uploading photo:', error);
        hideLoading();
        showError('Failed to upload photo');
    }
}

function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    
    if (searchTerm === '') {
        displayPhotos(photos);
        return;
    }

    const filteredPhotos = photos.filter(photo => 
        photo.title.toLowerCase().includes(searchTerm) ||
        (photo.description && photo.description.toLowerCase().includes(searchTerm))
    );

    displayPhotos(filteredPhotos);
}

function showLoading() {
    loading.style.display = 'flex';
    gallery.style.display = 'none';
    emptyState.style.display = 'none';
}

function hideLoading() {
    loading.style.display = 'none';
    gallery.style.display = 'grid';
}

function showError(message) {
    // Simple error handling - you could replace this with a toast notification
    alert('Error: ' + message);
}

function showSuccess(message) {
    // Simple success handling - you could replace this with a toast notification
    alert('Success: ' + message);
}

// Handle offline mode gracefully
window.addEventListener('online', () => {
    loadPhotos();
});

window.addEventListener('offline', () => {
    showError('You are offline. Some features may not work.');
}); 