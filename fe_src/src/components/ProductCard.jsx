import React from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Chip } from '@mui/material';

const ProductCard = ({ product, size = 'medium' }) => {
  const isSmall = size === 'small';
  
  // Small: 가로 스크롤용 작은 카드 (140px width, 180px height)
  // Medium: 2열 그리드용 중간 카드 (자동 너비, 220px height)
  
  return (
    <Card 
      sx={{ 
        height: isSmall ? 180 : 220,
        position: 'relative',
        borderRadius: 2,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.2s',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        '&:hover': {
          transform: 'scale(1.02)',
        },
        '&:active': {
          transform: 'scale(0.98)',
        }
      }}
    >
      <CardMedia
        component="img"
        height={isSmall ? "120" : "150"}
        image={product.image_url || 'https://via.placeholder.com/400x300'}
        alt={product.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ p: isSmall ? 1 : 1.5, pb: isSmall ? '8px !important' : '12px !important' }}>
        <Typography 
          variant={isSmall ? "caption" : "body2"} 
          sx={{ 
            fontWeight: 600,
            mb: 0.5,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontSize: isSmall ? '11px' : '13px',
          }}
        >
          {product.name}
        </Typography>
        <Typography 
          variant="caption" 
          sx={{ 
            display: 'block',
            color: '#666',
            fontSize: isSmall ? '10px' : '11px',
            mb: 0.3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {product.region?.city || '서울'} {product.region?.district || '용산구'}
        </Typography>
        {!isSmall && (
          <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5 }}>
            <Chip 
              label="시크" 
              size="small" 
              sx={{ 
                height: 18,
                fontSize: '10px',
                borderRadius: '4px',
                backgroundColor: '#f5f5f5',
              }}
            />
            <Chip 
              label="러블리" 
              size="small" 
              sx={{ 
                height: 18,
                fontSize: '10px',
                borderRadius: '4px',
                backgroundColor: '#f5f5f5',
              }}
            />
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
            height: 20,
            fontSize: '10px',
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

