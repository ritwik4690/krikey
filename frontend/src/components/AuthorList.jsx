import React, { useEffect, useState } from "react";
import AuthorDetails from "./AuthorDetails";
import axios from "axios";
import ErrrorPage from "./ErrrorPage";
import styles from "./AuthorStyles.module.css";
import { useLocation } from "react-router-dom";

function AuthorList() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const author_name = queryParams.get("author_name");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://13.52.77.220:3000/authors/top-authors",
          {
            params: {
              author_name: author_name,
            },
          }
        );
        if (!(response.status === 200)) {
          throw new Error("Network response was not ok", response.status);
        }
        const result = response.data;
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.response);
      }
    };

    fetchData();
  }, []);

  // Function to remove list item
  const onClickHandler = (e) => {
    //TODO: Logic to remove list item
    console.log("remove item");
  };
  return (
    <div>
      {error ? (
        <ErrrorPage error={error} />
      ) : (
        <div>
          {data && (
            <>
              {data.length === 10 && <h2 className={styles.list_title}>Top {data.length} authors</h2>}
              {data.map((author, index) => (
                <AuthorDetails
                  key={index}
                  authorName={author.author_name}
                  authorEmail={author.author_email}
                  onClickHandler={onClickHandler}
                />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default AuthorList;
