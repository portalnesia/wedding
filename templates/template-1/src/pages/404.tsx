import * as React from "react"
import { Link, HeadFC } from "gatsby"
// material
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Container } from '@mui/material';
import ScrollAnimation from 'react-animate-on-scroll';

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

const Custom404=()=>{
  
  return (
      <RootStyle>
        <Container>
            <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
              <ScrollAnimation animateIn="animate__bounceIn" animateOnce>
                <Typography variant="h3" paragraph>
                  Sorry, page not found!
                </Typography>
              </ScrollAnimation>
              <Typography sx={{ color: 'text.secondary' }}>
                Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL?
                Be sure to check your spelling.
              </Typography>

              <ScrollAnimation animateIn="animate__bounceIn" animateOnce>
                <Box
                  component="img"
                  src="/404.svg"
                  sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
                />
              </ScrollAnimation>

              <a href="https://portalnesia.com"><Button size="large" variant="text">
                Portalnesia
              </Button></a>
            </Box>
        </Container>
      </RootStyle>
  );
}

export default Custom404;

export const Head: HeadFC = () => <title>Not found - Portalnesia</title>
