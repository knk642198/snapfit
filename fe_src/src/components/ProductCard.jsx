import React from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Chip } from '@mui/material';

const ProductCard = ({ product, size = 'medium' }) => {
  const isSmall = size === 'small';
  
  // Small: 가로 스크롤용 작은 카드 (140px width, 200px height)
  // Medium: 2열 그리드용 중간 카드 (자동 너비, 280px height)
  
  return (
    <Card 
      elevation={0}
      sx={{ 
        height: isSmall ? 200 : 280,
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      <CardMedia
        component="img"
        height={isSmall ? "140" : "200"}
        image={product.image_url}
        alt={product.name}
      />
      <CardContent sx={{ p: isSmall ? 1.5 : 2, pb: isSmall ? '12px !important' : '16px !important' }}>
        <Typography 
          variant="caption" 
          sx={{ 
            fontWeight: 600,
            mb: 0.5,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {product.region?.city} {product.region?.district}
        </Typography>
        <Typography 
          variant={isSmall ? "caption" : "body2"} 
          sx={{ 
            fontWeight: 600,
            mb: 0.5,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            fontSize: isSmall ? '12px' : '14px',
            lineHeight: 1.4,
          }}
        >
          {product.description}
        </Typography>
        {!isSmall && product.product_category?.length > 0 && (
          <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5, flexWrap: 'wrap' }}>
            {product.product_category.slice(0, 2).map((pc, index) => (
              <Chip 
                key={index}
                label={pc.category?.name} 
                size="small" 
                sx={{ 
                  height: 20,
                  fontSize: '11px',
                  borderRadius: '4px',
                  backgroundColor: '#f5f5f5',
                }}
              />
            ))}
          </Box>
        )}
      </CardContent>
      {product.use_flag && (
        <Chip 
          label="스튜디오" 
          size="small" 
          sx={{ 
            position: 'absolute', 
            top: 8, 
            left: 8,
            height: 22,
            fontSize: '11px',
            backgroundColor: '#5B7FFF',
            color: 'white',
            fontWeight: 600,
          }}
        />
      )}
    </Card>
  );
};

export default ProductCard;

