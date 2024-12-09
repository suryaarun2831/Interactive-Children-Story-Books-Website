import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetStories } from '../API/Api';
import SpeechToTextComponent from '../SpeechToVoice/SpeechToTextComponent';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [stories, setStories] = useState([]);
  const booksPerPage = 8;

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await GetStories();
        setStories(res.data);
        console.log('Stories fetched:', res.data);
      } catch (err) {
        console.log('Error Loading Stories:', err);
      }
    };
    fetchStories();
  }, []); // Avoid infinite calls with empty dependency array

  // Update searchTerm with text from SpeechToTextComponent
  const SetText = useCallback(
    (words) => {
      console.log('Recognized words:', words); // Debugging
      setSearchTerm(words.toLowerCase());
      setCurrentPage(1); // Reset pagination
    },
    [setSearchTerm, setCurrentPage]
  );

  // Filter books based on search term
  const filteredBooks = stories.filter((book) =>
    book.title.toLowerCase().includes(searchTerm)
  );

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="dashboard">
      <div className="header">
        <SpeechToTextComponent ChangeText={SetText} />
        <h1 className="dashboard-header">Big Books & Story Books</h1>
        <div className="filters">
          <button>5-10</button>
          <button>10-18</button>
          <button>18+</button>
        </div>
      </div>

      <div className="bookshelf">
        {currentBooks.length > 0 ? (
          currentBooks.map((book) => (
            <div
              key={book.storyId}
              className="book-card"
              onClick={() => {
                localStorage.setItem('$toryId', book.storyId);
                localStorage.setItem('storyTitle', book.title);
                localStorage.setItem('storyimg', book.img);
                navigate('/story-page');
              }}
            >
              <img src={book.img} alt={book.title} />
              <p className="book-title">{book.title}</p>
            </div>
          ))
        ) : (
          <p>No books found</p>
        )}
      </div>

      {filteredBooks.length > booksPerPage && (
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            &lt; Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
