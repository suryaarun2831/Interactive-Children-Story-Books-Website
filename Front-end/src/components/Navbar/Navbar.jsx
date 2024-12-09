import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';
import theme_icon from '../../assets/Profile/night-mode.png';
import profile_icon from '../../assets/Profile/profile.png';
import user from '../../assets/Profile/user.png';
import './Navbar.css';
const Navbar = () => {
  const theme=localStorage.getItem('theme');
  useEffect(() => {
    if (theme === 'dark') {
      document.body.style.backgroundColor = '#212020';
    } else {
      document.body.style.backgroundColor = 'white';
    }
  }, [theme]);
  const navigate = useNavigate();
  const [isOpen,setOpen]=useState(false);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === true;
  const storedUserRole = localStorage.getItem('userRole');
  console.log(isLoggedIn);

  const handleToggle=()=>{
    isOpen?setOpen(false):setOpen(true);
  }
  const handleTheme=(e)=>{
    const theme=localStorage.getItem('theme');
   theme==='light' ? localStorage.setItem('theme','dark'):localStorage.setItem('theme','light');
   window.location.reload();
  }

  return (
    <div className={`navbar-container ${theme==='dark'?'dark':''}`}>
      <svg id="logo-13" width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg"> 
        <path d="M1.98441 29.2899C1.98441 27.0299 2.42954 24.7919 3.29444 22.704C4.15935 20.6159 5.42701 18.7187 7.02513 17.1206C8.62324 15.5225 10.5204 14.2548 12.6084 13.3899C14.6965 12.5251 16.9344 12.0799 19.1945 12.0799V29.2899H1.98441Z" class="ccustom" fill="#442781"></path> 
        <path d="M1.98441 29.2899C1.98441 31.55 2.42954 33.7879 3.29444 35.876C4.15935 37.964 5.42701 39.8612 7.02513 41.4593C8.62324 43.0574 10.5204 44.3251 12.6084 45.19C14.6965 46.0549 16.9344 46.5 19.1945 46.5V29.2899H1.98441Z" class="ccompli1" fill="#61459C"></path> 
        <path d="M36.4043 29.2899C36.4043 31.55 35.9595 33.7879 35.0947 35.876C34.2298 37.964 32.9622 39.8612 31.3638 41.4593C29.7657 43.0574 27.8685 44.3251 25.7804 45.19C23.6925 46.0549 21.4545 46.5 19.1945 46.5V29.2899H36.4043Z" class="ccompli2" fill="#A992DB"></path> 
        <path d="M47.0156 14.422C47.0156 21.5586 41.23 27.344 34.0935 27.344H21.1716V14.422C21.1716 7.2854 26.957 1.5 34.0935 1.5C41.23 1.5 47.0156 7.2854 47.0156 14.422Z" class="ccustom" fill="#FF7917"></path> 
      </svg>
      <p className='navbar-heading'>WonderBooks</p>
      <div className={`navbar-links`}>
          <img src={theme_icon} className='theme-btn' alt='404' onClick={handleTheme}/>
      <ul className={`navbar-list ${isOpen ? 'navbar-list_active' : ''}`}>
          <li><Link to='/home' onClick={handleToggle}>Home</Link></li>
          <li><Link to='/quiz' onClick={handleToggle}>Quiz</Link></li>
          {storedUserRole === 'admin' && <li><Link to='/user' onClick={handleToggle}>Users</Link></li>}
          {/* {storedUserRole !== 'admin' && <li><Link to='/cart' onClick={handleToggle}>Cart</Link></li>} */}
          {/* For Admin */}
          {storedUserRole === 'admin' && <li><Link to='/books' onClick={handleToggle}>Books</Link></li>}
          {/* For User */}
          {storedUserRole !== 'admin' && <li><Link to='/dashboard' onClick={handleToggle}>Books</Link></li>} 

          {storedUserRole !== 'admin' && <li><Link to='/about' onClick={handleToggle}>About</Link></li>}
          {storedUserRole !== 'admin' && <li><Link to='/contact' onClick={handleToggle}>Contact</Link></li>}
          {isLoggedIn ? 
            <>
              <li><Link to='/'>Login</Link></li>
            </>
            :
            <>
              <li><img src={theme=='dark'?profile_icon:user} className='nav-profile' onClick={() => { navigate('/profile'); }} alt='404'/> </li>
            </>
          }
        </ul>
        <div id='nav-mobile' onClick={handleToggle}>
             <i className={`fa-solid ${isOpen ? 'fa-x' : 'fa-bars'}`}></i>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
