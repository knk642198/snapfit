import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Tab,
  Tabs,
  Grid,
} from '@mui/material';
import ProductCard from '../components/ProductCard';
import { productAPI } from '../api/client';

const Home = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);

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

  // 탭 라벨과 카테고리 매핑
  const tabCategories = ['홈', '러블리', '시크', '키치', '차분한'];
  
  // 선택된 탭에 따라 상품 필터링
  const filteredProducts = selectedTab === 0 
    ? products
    : products.filter(product => 
        product.product_category?.some(
          pc => pc.category?.name === tabCategories[selectedTab]
        )
      );

  // 대표 상품 (캐러셀용)
  const featuredProducts = filteredProducts.slice(0, 5);
  // 그리드용 상품
  const gridProducts = filteredProducts;

  // 스크롤 이벤트로 현재 슬라이드 감지
  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft;
      const itemWidth = carouselRef.current.offsetWidth;
      const newIndex = Math.round(scrollLeft / itemWidth);
      setCurrentSlide(newIndex);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'white' }}>
      {/* Header - 로고 중앙 배치 */}
      <Box 
        sx={{ 
          backgroundColor: 'white', 
          borderBottom: '1px solid #eee',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
        }}
      >
        <Box 
          sx={{ 
            maxWidth: '600px',
            mx: 'auto',
            px: 2,
          }}
        >
          {/* 로고 - 중앙 배치 */}
          <Box sx={{ 
            py: 2, 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center' 
          }}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 800, 
                letterSpacing: '2px',
                fontFamily: '"Helvetica Neue", Arial, sans-serif',
              }}
            >
              SNAPFiT
            </Typography>
          </Box>
          
          {/* 탭 */}
          <Tabs 
            value={selectedTab} 
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons={false}
            sx={{
              minHeight: 36,
              '& .MuiTab-root': {
                minHeight: 36,
                minWidth: 'auto',
                px: 1.5,
                fontSize: '14px',
                fontWeight: 500,
                color: '#999',
                textTransform: 'none',
              },
              '& .Mui-selected': {
                color: '#000',
                fontWeight: 600,
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#000',
                height: 2,
              },
            }}
          >
            <Tab label="홈" />
            <Tab label="러블리" />
            <Tab label="시크" />
            <Tab label="키치" />
            <Tab label="차분한" />
          </Tabs>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ maxWidth: '600px', mx: 'auto' }}>
        
        {/* 대표 이미지 캐러셀 섹션 */}
        {!loading && featuredProducts.length > 0 && (
          <Box sx={{ mb: 4 }}>
            {/* 가로 스크롤 캐러셀 */}
            <Box
              ref={carouselRef}
              onScroll={handleScroll}
              sx={{
                display: 'flex',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                scrollBehavior: 'smooth',
                '&::-webkit-scrollbar': { display: 'none' },
                scrollbarWidth: 'none',
              }}
            >
              {featuredProducts.map((product, index) => (
                <Box
                  key={product.id}
                  sx={{
                    minWidth: '100%',
                    scrollSnapAlign: 'start',
                    px: 2,
                    pt: 3,
                    boxSizing: 'border-box',
                  }}
                >
                  {/* 대표 이미지 */}
                  <Box
                    sx={{
                      width: '100%',
                      aspectRatio: '3 / 4',
                      backgroundColor: '#f5f5f5',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      component="img"
                      src={product.image_url}
                      alt={product.name}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                  
                  {/* 상품 정보 */}
                  <Box sx={{ mt: 2, mb: 3 }}>
                    <Typography 
                      sx={{ 
                        fontSize: '18px', 
                        fontWeight: 600,
                        letterSpacing: '0.5px',
                        mb: 1,
                      }}
                    >
                      {product.name}
                    </Typography>
                    {product.product_category?.length > 0 && (
                      <Typography 
                        sx={{ 
                          fontSize: '13px', 
                          color: '#888',
                        }}
                      >
                        {product.product_category.map(pc => pc.category?.name).filter(Boolean).join(' · ')}
                      </Typography>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>

            {/* 도트 인디케이터 */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 1,
              pb: 3,
            }}>
              {featuredProducts.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: currentSlide === index ? '#000' : '#ddd',
                    transition: 'background-color 0.3s',
                  }}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* 추천 상품 그리드 섹션 */}
        <Box sx={{ px: 2, pb: 6 }}>
          <Typography 
            sx={{ 
              fontSize: '16px', 
              fontWeight: 600, 
              mb: 2,
              letterSpacing: '0.3px',
            }}
          >
            추천상품
          </Typography>
          
          <Grid container spacing={1.5}>
            {gridProducts.map((product) => (
              <Grid item xs={6} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* 로딩 상태 */}
        {loading && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '50vh' 
          }}>
            <Typography sx={{ color: '#999' }}>로딩 중...</Typography>
          </Box>
        )}

        {/* 빈 상태 */}
        {!loading && filteredProducts.length === 0 && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '30vh' 
          }}>
            <Typography sx={{ color: '#999', fontSize: '14px' }}>
              '{tabCategories[selectedTab]}' 카테고리에 해당하는 상품이 없습니다.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Home;
