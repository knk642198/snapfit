import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Tab,
  Tabs,
  Grid,
  Card,
  CardMedia,
  Chip,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ProductCard from '../components/ProductCard';
import { productAPI } from '../api/client';

const Home = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await productAPI.getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('상품 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const featuredProduct = products[0];
  const recommendedProducts = products.slice(1, 4);
  const allProducts = products.slice(0, 4);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      {/* Header */}
      <Box 
        sx={{ 
          backgroundColor: 'white', 
          borderBottom: '2px solid #000',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          px: 2,
        }}
      >
        <Box sx={{ py: 2, mb: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', letterSpacing: '0.5px' }}>
            SNAPFiT
          </Typography>
        </Box>
        <Tabs 
          value={selectedTab} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons={false}
          sx={{
            minHeight: 40,
            '& .MuiTab-root': {
              minHeight: 40,
              minWidth: 'auto',
              px: 2,
              fontSize: '15px',
              fontWeight: 500,
              color: '#999',
            },
            '& .Mui-selected': {
              color: '#000',
              fontWeight: 600,
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#000',
              height: 3,
            },
          }}
        >
          <Tab label="홈" />
          <Tab label="리뷰" />
          <Tab label="시크" />
          <Tab label="키치" />
          <Tab label="차분한" />
        </Tabs>
      </Box>

      {/* Main Content with Padding */}
      <Box sx={{ px: 2, py: 3 }}>
        {/* Main Banner Section */}
        {!loading && featuredProduct && (
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                이런 사진은 어때요?
              </Typography>
              <ArrowForwardIcon sx={{ fontSize: 24 }} />
            </Box>
            
            {/* Featured Product Card */}
            <Card 
              sx={{ 
                height: 320,
                position: 'relative',
                borderRadius: 2,
                overflow: 'hidden',
                mb: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
            >
              <CardMedia
                component="img"
                height="100%"
                image={featuredProduct.image_url || 'https://via.placeholder.com/400x320'}
                alt={featuredProduct.name}
                sx={{ objectFit: 'cover' }}
              />
              {featuredProduct.use_flag && (
                <Chip 
                  label="스튜디오" 
                  size="small" 
                  sx={{ 
                    position: 'absolute', 
                    top: 12, 
                    left: 12,
                    backgroundColor: '#5B7FFF',
                    color: 'white',
                    fontWeight: 600,
                  }}
                />
              )}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 70%, transparent 100%)',
                  color: 'white',
                  p: 2,
                }}
              >
                <Typography variant="caption" sx={{ display: 'block', mb: 0.5, opacity: 0.9 }}>
                  {featuredProduct.region?.city || '서울'} {featuredProduct.region?.district || '용산구'} | 중구
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.3, lineHeight: 1.3 }}>
                  '{featuredProduct.photographer?.name || '대왕개미 삭숭 컨셉스냅'}'
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.9, lineHeight: 1.4 }}>
                  {featuredProduct.description || '전문 인기 포토그래퍼, 데이터만니 만'}
                </Typography>
              </Box>
            </Card>

            {/* Horizontal Scrollable Recommended Products */}
            <Box 
              sx={{ 
                display: 'flex',
                gap: 1.5,
                overflowX: 'auto',
                pb: 1,
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
                scrollbarWidth: 'none',
              }}
            >
              {recommendedProducts.map((product) => (
                <Box key={product.id} sx={{ minWidth: 140, flexShrink: 0 }}>
                  <ProductCard product={product} size="small" />
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* "나만의 소중한 추억을 만들어보세요" Section */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            나만의 소중한 추억을 만들어보세요
          </Typography>
          
          <Grid container spacing={2}>
            {allProducts.map((product) => (
              <Grid item xs={6} key={product.id}>
                <ProductCard product={product} size="medium" />
              </Grid>
            ))}
          </Grid>
        </Box>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
            <Typography>로딩 중...</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Home;

