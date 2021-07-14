import React from 'react'
import {
  ButtonGroup,
  Button,
  FormSelect,
} from "shards-react";

const PaginationAndSelect = ({
  pageValue,
  resultPageSize,
  handlePageSizeValue,
}) => {

  const ProfileDetail = () => {
    const items = [];
    for (let val = 1; val <= resultPageSize; val += 1) {
      items.push(val)
    }
    return items
  };

  const paginationSize = resultPageSize > 5 ? 5 : resultPageSize
  const PaginationBtn = () => {
    const btns = []
    for (let val = 1; val <= paginationSize; val += 1) {
      btns.push(val)
    }
    return btns
  }

  return (
    <ButtonGroup
      className="center"
      style={{ display: !resultPageSize && 'none' }}
    >
      <Button
        title="第一頁"
        theme="white"
        disabled={pageValue === 1}
        value={1}
        onClick={(e) => handlePageSizeValue(e)}
      >{`<<`}</Button>
      <Button
        title="上一頁"
        theme="white"
        disabled={pageValue === 1}
        value={pageValue - 1}
        onClick={(e) => handlePageSizeValue(e)}
      >{`<`}</Button>
      {resultPageSize === 1 && <Button title="第1頁" theme="white" >1</Button>}
      {resultPageSize > 1 && pageValue < 5 &&
        PaginationBtn().map(item => (
          <Button
            key={item}
            title={`第${item}頁`}
            theme={pageValue === item ? 'primary' : "white"}
            value={item}
            onClick={(e) => handlePageSizeValue(e)}>{item}</Button>
        ))
      }
      {resultPageSize === 5 && pageValue === 5 &&
        PaginationBtn().map(item => (
          <Button
            key={item}
            title={`第${item}頁`}
            theme={pageValue === item ? 'primary' : "white"}
            value={item}
            onClick={(e) => handlePageSizeValue(e)}>{item}</Button>
        ))
      }
      {resultPageSize > 5 && pageValue >= 5 &&
        <Button
          disabled
          theme="white"
        >...</Button>}
      {resultPageSize > 5
        && pageValue >= 5
        && (pageValue + 1 <= resultPageSize) &&
        <>
          <Button
            theme="white"
            title={`第${pageValue - 1}頁`}
            value={pageValue - 1}
            onClick={(e) => handlePageSizeValue(e)}>
              {pageValue - 1}
          </Button>
          <Button
            title={`第${pageValue}頁`}
            theme="primary">
              {pageValue}
          </Button>
          <Button
            title={`第${pageValue + 1}頁`}
            theme="white"
            value={pageValue + 1}
            onClick={(e) => handlePageSizeValue(e)}>
              {pageValue + 1}
          </Button>
        </>
      }
      {resultPageSize > 5 && pageValue !== resultPageSize &&
        <Button
          disabled
          theme="white"
        >...</Button>}
      {pageValue === resultPageSize && resultPageSize > 5 &&
        <>
          <Button
            title={`第${pageValue - 1}頁`}
            theme="white"
            value={pageValue - 1}
            onClick={(e) => handlePageSizeValue(e)}>
              {pageValue - 1}
          </Button>
          <Button
            title={`第${pageValue}頁`}
            theme="primary">
              {pageValue}
          </Button>
        </>
      }
      <Button
        title="下一頁"
        theme="white"
        disabled={resultPageSize === 1 || pageValue === resultPageSize}
        value={pageValue + 1}
        onClick={(e) => handlePageSizeValue(e)}
      >{`>`}</Button>
      <Button
        title="最後一頁"
        theme="white"
        disabled={resultPageSize === 1 || pageValue === resultPageSize}
        value={resultPageSize}
        onClick={(e) => handlePageSizeValue(e)}
      >{`>>`}</Button>
      <FormSelect
        className="ml-1"
        size="xs"
        placeholder="選擇指定頁"
        value={pageValue}
        disabled={resultPageSize === 1}
        onChange={(e) => handlePageSizeValue(e)}
      >
        {
          ProfileDetail().map(item => (
            <option key={item} value={item}>第{item}頁</option>
          ))
        }
      </FormSelect>
    </ButtonGroup>
  )
}

export default PaginationAndSelect
