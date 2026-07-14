import { useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import AppPagination from '../components/ui/AppPagination';
import { getPaginatedCourses } from '../services/courseService';
import AppInput from '../components/ui/AppInput';
import AppSelect from '../components/ui/AppSelect';
import PageHero from '../components/layout/PageHero';

const ageFilters = ['18 tháng - 3 tuổi', '2 - 4 tuổi', '6 tháng - 2 tuổi', '1 - 5 tuổi', '2 - 5 tuổi', '3 - 6 tuổi'];
const categoryFilters = ['Chậm phát triển ngôn ngữ', 'Khó khăn giao tiếp và tương tác xã hội', 'Chậm phát triển vận động'];
const modeFilters = ['tương tác', 'ngôn ngữ', 'vận động'];

function CoursesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [ageRange, setAgeRange] = useState(searchParams.get('ageRange') || '');
  const [learningMode, setLearningMode] = useState(searchParams.get('learningMode') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'name');
  const page = Number(searchParams.get('page') || '1');

  const { items, totalPages } = useMemo(
    () => getPaginatedCourses({ query, category, ageRange, learningMode, maxPrice, sort, page }),
    [query, category, ageRange, learningMode, maxPrice, sort, page],
  );

  const applyFilters = () => {
    const nextParams = new URLSearchParams();
    if (query) nextParams.set('query', query);
    if (category) nextParams.set('category', category);
    if (ageRange) nextParams.set('ageRange', ageRange);
    if (learningMode) nextParams.set('learningMode', learningMode);
    if (maxPrice) nextParams.set('maxPrice', maxPrice);
    if (sort) nextParams.set('sort', sort);
    nextParams.set('page', '1');
    setSearchParams(nextParams);
  };

  const handlePageChange = (nextPage) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('page', String(nextPage));
    setSearchParams(nextParams);
  };

  return (
    <>
      <PageHero
        eyebrow="Khóa học dành cho trẻ"
        title="Lựa chọn khóa học phù hợp với nhu cầu phát triển"
        description="Từ các lộ trình tương tác ngôn ngữ đến các khóa hỗ trợ vận động và giao tiếp, mỗi khóa học đều được thiết kế để mẹ và trẻ cùng đồng hành với niềm tin và tiến bộ rõ ràng."
        actions={[
          <Button key="survey" as={Link} to="/survey" variant="primary">Khảo sát ngay</Button>,
          <Button key="contact" as={Link} to="/contact" variant="outline-primary">Liên hệ tư vấn</Button>,
        ]}
        image="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=80"
        imageAlt="Khóa học dành cho trẻ"
      />

      <Container className="py-5">
      <Row className="g-4">
        <Col lg={3}>
          <Card className="border-0 rounded-4 shadow-sm sticky-top" style={{ top: '90px' }}>
            <Card.Body>
              <h2 className="h5 fw-bold mb-3">Bộ lọc khóa học</h2>
              <Form.Group className="mb-3">
                <Form.Label>Tìm kiếm</Form.Label>
                <AppInput value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Tên khóa học" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nhóm phát triển</Form.Label>
                <AppSelect value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="">Tất cả</option>
                  {categoryFilters.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </AppSelect>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Độ tuổi</Form.Label>
                <AppSelect value={ageRange} onChange={(e) => setAgeRange(e.target.value)}>
                  <option value="">Tất cả</option>
                  {ageFilters.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </AppSelect>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Hình thức học</Form.Label>
                <AppSelect value={learningMode} onChange={(e) => setLearningMode(e.target.value)}>
                  <option value="">Tất cả</option>
                  {modeFilters.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </AppSelect>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Mức học phí tối đa</Form.Label>
                <AppSelect value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}>
                  <option value="">Tất cả</option>
                  <option value="3000000">Dưới 3 triệu</option>
                  <option value="3500000">Dưới 3.5 triệu</option>
                  <option value="4000000">Dưới 4 triệu</option>
                </AppSelect>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Sắp xếp</Form.Label>
                <AppSelect value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="name">Theo tên</option>
                  <option value="price">Theo học phí</option>
                </AppSelect>
              </Form.Group>
              <Button variant="primary" onClick={applyFilters} className="w-100">
                Áp dụng bộ lọc
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={9}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <p className="text-primary fw-semibold mb-1">Danh sách khóa học</p>
              <h1 className="h3 fw-bold mb-0">Tìm khóa học phù hợp cho trẻ</h1>
            </div>
            <div className="text-muted">{items.length} khóa học</div>
          </div>
          <Row className="g-4">
            {items.map((course) => (
              <Col md={6} key={course.id}>
                <Card className="h-100 border-0 rounded-4 shadow-sm overflow-hidden">
                  <Card.Img variant="top" src={course.thumbnail} alt={course.title} style={{ height: '220px', objectFit: 'cover' }} />
                  <Card.Body>
                    <p className="small text-primary fw-semibold mb-2">{course.category}</p>
                    <h3 className="h5 fw-bold">{course.title}</h3>
                    <p className="text-muted small">Độ tuổi: {course.ageRange} • {course.duration}</p>
                    <p className="text-muted">{course.description}</p>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <div className="fw-bold">{course.price.toLocaleString('vi-VN')}đ</div>
                      <Button as={Link} to={`/courses/${course.id}`} variant="outline-primary" size="sm">
                        Xem chi tiết
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <AppPagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </Col>
      </Row>
      </Container>
    </>
  );
}

export default CoursesPage;
