import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Book } from '../../../../models/book';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent {
  @Output() bookAdded = new EventEmitter<Book>();

  bookUrl: string = '';
  newBook: Book = { title: '', author: '', image: '' };
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  async fetchBookDetails() {
    if (!this.bookUrl) return;

    this.isLoading = true;
    this.errorMessage = '';
    this.newBook = { title: '', author: '', image: '' };

    try {
      // Updated API URL
      const apiUrl = `http://localhost:3000/api/fetch-metadata?url=${encodeURIComponent(
        this.bookUrl
      )}`;
      console.log(`Fetching metadata for: ${this.bookUrl}`);

      const response: any = await this.http.get(apiUrl).toPromise();
      console.log('Metadata response:', response);

      if (response && response.title) {
        this.newBook = {
          title: response.title,
          author: response.author || 'Unknown Author',
          image: response.image || '',
        };
      } else {
        throw new Error('No book details found.');
      }
    } catch (error: any) {
      console.error('Error fetching book details:', error);
      this.errorMessage = `Failed to retrieve book details: ${error.message}`;
    } finally {
      this.isLoading = false;
    }
  }

  addBook() {
    if (this.newBook.title && this.newBook.image) {
      console.log('📘 Emitting book:', this.newBook);
      this.bookAdded.emit({ ...this.newBook }); // Emit new object
      this.resetForm();
      this.closeModal();
    } else {
      console.warn('Error: Cannot add book: Missing details', this.newBook);
    }
  }

  resetForm() {
    this.bookUrl = '';
    this.newBook = { title: '', author: '', image: '' };
  }

  closeModal() {
    console.log('Closing modal');
    const modalElement = document.getElementById('addBookModal');

    if (modalElement) {
      try {
        const modalInstance = (window as any).bootstrap.Modal.getInstance(
          modalElement
        );
        if (modalInstance) {
          modalInstance.hide();
          console.log('Modal closed successfully');
        } else {
          console.warn(
            '⚠️ Modal instance not found, attempting manual removal'
          );
        }

        setTimeout(() => {
          modalElement.classList.remove('show');
          modalElement.setAttribute('aria-hidden', 'true');
          document.body.classList.remove('modal-open');

          const backdrop = document.querySelector('.modal-backdrop');
          if (backdrop) {
            backdrop.remove();
            console.log('Removed modal backdrop');
          }
        }, 300);
      } catch (error) {
        console.error('Error closing modal:', error);
      }
    }
  }
}
