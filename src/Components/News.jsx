import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeNews } from "../redux/actions/CoinActions";
let useStyle = makeStyles({
  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: "10px",
  },

  card_height: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "200px",
    margin: "10px",
  },
  tag: {},
});
const News = () => {
  let style = useStyle();
  const [Loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const news = useSelector((state) => state.News);
  let options = {
    headers: {
      "x-rapidapi-host": "crypto-news-live3.p.rapidapi.com",
      "x-rapidapi-key": "330cee9731msh55db8441a231e57p1de422jsn29e8cb40c29f",
    },
  };
  const fetchNews = async () => {
    console.log("Api call is on....");
    let response = await axios
      .get("https://crypto-news-live3.p.rapidapi.com/news", options)
      .catch((err) => {
        console.log(err);
      });
    dispatch(storeNews(response.data));
    setLoaded(true);
  };
  useEffect(() => {
    console.log("UseEffecting is working.......");
    fetchNews();
  }, []);

  return (
    <>
      {Loaded && (
        <div>
          <Container>
            <Box style={{ margin: "10px" }} className={style.flex}>
              {news.news.map((NewsContent) => (
                <Card
                  className={style.card_height}
                  sx={{
                    maxWidth: "340px",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6">{NewsContent.title}</Typography>
                  </CardContent>
                  <CardContent>
                    <hr></hr>
                    <a href={NewsContent.url} target="_blank">
                      See More...
                    </a>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Container>
        </div>
      )}
    </>
  );
};

export default News;
