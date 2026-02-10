import React, { useEffect, useState } from 'react';
import './style.css';
import DashboardHeader from '../../DashboardHeader/DashboardHeader';
import MatchesUserBox from '../../MatchesUserBox/MatchesUserBox';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { app } from '../../../firebase';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import Skeleton from 'react-loading-skeleton';
import {useDispatch} from 'react-redux'
import { setMatches } from '../../../redux/MatchesUser';
const Matches = () => {
  const [filter, setFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [userPairs, setUserPairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const pairsPerPage = 8;
   const dispatch = useDispatch()
  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const db = getFirestore(app);

  const getUsers = async () => {
    try {
      setLoading(true);
      const collectionRef = collection(db, 'users');
      const result = await getDocs(collectionRef);
      const users = result.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      // Find pairs of users with shared interests
      const pairs = [];
      for (let i = 0; i < users.length; i++) {
        for (let j = i + 1; j < users.length; j++) {
          const user1 = users[i];
          const user2 = users[j];
          if (haveCommonInterest(user1, user2)) {
            pairs.push({ user1, user2 });
          }
        }
      }
      setUserPairs(pairs);
      setLoading(false);
      dispatch(setMatches(pairs.length))
    
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const haveCommonInterest = (user1, user2) => {
    const interests1 = user1.interests || [];
    const interests2 = user2.interests || [];
    return interests1.some((interest) => interests2.includes(interest));
  };

  useEffect(() => {
    getUsers();
  }, []);

  const indexOfLastPair = currentPage * pairsPerPage;
  const indexOfFirstPair = indexOfLastPair - pairsPerPage;
  const currentPairs = userPairs.slice(indexOfFirstPair, indexOfLastPair);
  
  return (
    <div className="matches-container">
      <DashboardHeader />
      <div className="matches-top">
        <span>Matches</span>
        <div className="matches-top-btn">
          <span
            className={filter === 'All' ? 'active' : ''}
            onClick={() => handleFilterChange('All')}
          >
            All
          </span>
          <span
            className={filter === 'Approved' ? 'active' : ''}
            onClick={() => handleFilterChange('Approved')}
          >
            Approved
          </span>
        </div>
      </div>
      <div className="matches-users-box">
        <div className="matches-users-box-header">
          <span>S.No.</span>
          <span>User 1</span>
          <span>User 2</span>
          <span>Martial Status</span>
          <span>Location</span>
          <span style={{width:'auto'}}>Action</span>
        </div>
        <div className="matches-users">
          {loading ? (
            <div className='loader-container'>
               {
                Array(8).fill().map((item)=>(
                  <Skeleton width={'100%'} height={40} borderRadius={9}/>
                ))
               }
            </div>
          ) : (
            currentPairs.map((pair, index) => (
              <MatchesUserBox key={index} userData={pair} />
            ))
          )}
        </div>
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {' '}
            <ChevronLeft />{' '}
          </button>
          <button
            className={currentPage === 1 ? 'active' : ''}
            onClick={() => handlePageChange(1)}
          >
            1
          </button>
          <button
            className={currentPage === 2 ? 'active' : ''}
            onClick={() => handlePageChange(2)}
          >
            2
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(userPairs.length / pairsPerPage)}
          >
            {' '}
            <ChevronRight />{' '}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Matches;
