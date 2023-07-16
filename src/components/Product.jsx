import { Button, Card, ListGroup } from 'react-bootstrap';

export default function Product() {
  const product = {
    name: 'Apple Watch',
    category: 'apple',
    imageURL:
      'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/watch-card-40-ultra-202209_GEO_KR?wid=680&hei=528&fmt=png-alpha&.v=1678733188783',
    description:
      '부담 없지만 기능은 가득, 그 어느 때보다 탁월한 가성비. 당신의 피트니스, 건강 및 안전을 모니터링해줄 강력한 센서들. 한층 향상된 성능을 위한 더 빠른 듀얼 코어 프로세서까지.',
    price: 200,
  };
  const onClickPaymentHandler = () => {
    console.log('버튼클릭');
  };

  return (
    <Card style={{ width: '18rem', marginTop: '2rem' }}>
      <Card.Img variant='top' src={product.imageURL} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
      </Card.Body>

      <ListGroup className='list-group-flush'>
        <ListGroup.Item>Category : {product.category}</ListGroup.Item>
        <ListGroup.Item>Price : {product.price}원</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Button variant='primary' onClick={onClickPaymentHandler}>
          구매하기
        </Button>
      </Card.Body>
    </Card>
  );
}
