import React from 'react'
import {
  Container,
  Col,
  Card,
  CardHeader,
  CardBody,
  FormSelect,
} from 'react-bootstrap';
import Pagination from "./Pagination";
import Table from './Table';

const PaginationAndTable = ({
  pageValue,
  resultPageSize,
  handlePageSizeValue,
  pageSize,
  handlePageSizeChange,
  pageSizeOptions,
  tableColumns,
  tableData,
  handleDescClick,
  loading,
  tableStyle,
 }) => (
  <>
    <Col xs="12" className="mb-2">
      <Pagination
        pageValue={pageValue}
        resultPageSize={resultPageSize}
        handlePageSizeValue={handlePageSizeValue}
      />
    </Col>
    <Col xs="12" className="mb-2">
      <Card>
        <CardHeader className="p-0">
          <Container fluid className="border-bottom">
            <Col
              className="file-manager__filters__rows d-flex"
              style={{ padding: '0.3rem' }}
              md="6"
            >
              <span>顯示</span>
              <FormSelect
                size="sm"
                value={pageSize}
                onChange={handlePageSizeChange}
              >
                {pageSizeOptions.map((size, idx) => (
                  <option key={idx} value={size}>
                    {size} 項
                  </option>
                ))}
              </FormSelect>
            </Col>
          </Container>
        </CardHeader>
        <CardBody className="p-0">
          <div className="">
            <Table
              tableStyle={tableStyle}
              columns={tableColumns}
              onClick={handleDescClick}
              data={tableData}
              pageSize={pageSize}
              loading={loading}
            />
          </div>
        </CardBody>
      </Card>
    </Col>
    <Col xs="12" className="mb-3 mr-1">
      <Pagination
        pageValue={pageValue}
        resultPageSize={resultPageSize}
        handlePageSizeValue={handlePageSizeValue}
      />
    </Col>
  </>
)

export default PaginationAndTable
