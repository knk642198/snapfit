import React from 'react';
import { Box, Typography } from '@mui/material';

const ProductCard = ({ product }) => {
  // 카테고리 이름들 추출
  const categoryNames = product.product_category
    ?.map(pc => pc.category?.name)
    .filter(Boolean)
    .join(' · ');

  return (
    <Box 
      sx={{ 
        cursor: 'pointer',
        '&:hover': {
          opacity: 0.9,
        },
      }}
    >
      {/* 상품 이미지 */}
      <Box
        sx={{
          width: '100%',
          aspectRatio: '1 / 1',
          backgroundColor: '#f5f5f5',
          overflow: 'hidden',
          mb: 1,
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

      {/* 상품명 */}
      <Typography 
        sx={{ 
          fontSize: '13px',
          fontWeight: 500,
          color: '#000',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          mb: 0.3,
        }}
      >
        {product.name}
      </Typography>

      {/* 카테고리 */}
      {categoryNames && (
        <Typography 
          sx={{ 
            fontSize: '12px',
            color: '#888',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {categoryNames}
        </Typography>
      )}
    </Box>
  );
};

export default ProductCard;
