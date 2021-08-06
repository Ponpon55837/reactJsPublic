import React from 'react';
import {
  Row,
  Col,
} from 'shards-react';
import moment from 'moment';
import Select from 'react-select';
import { css } from "@emotion/core";

const defaultValue = {
  getYear: moment().format('YYYY'),
  getMonth: moment().format('MM')
}

const CustomYearAndMonthSelect =
  ({handleStatusInputChangeYear, handleStatusInputChangeMonth}) => {

  const styles=css`
    Select {
      z-index: 0;
    }
  `

  const yearOption = [];
  for (let i = 0; i <= 4; i += 1) {
    yearOption.push({
      value: defaultValue.getYear - i,
      label: `${defaultValue.getYear - i} 年` });
  }

  const monthOption = [];
  for (let i = 1; i <= 12; i += 1) {
    monthOption.push({ value: i, label: `${(i + '').padStart(2, '0')} 月` });
  }

  return (
    <Row>
      <Col className="pr-1" css={styles}>
        <Select
          styles={{
            container: (provided) => ({
              ...provided,
              width: '6.5rem',
            }),
          }}
          isClearable={false}
          isSearchable={false}
          placeholder={`${defaultValue.getYear} 年`}
          onChange={handleStatusInputChangeYear}
          options={yearOption}
        />
      </Col>
      {handleStatusInputChangeMonth &&
        <Col className="px-1" css={styles}>
          <Select
            styles={{
              container: (provided) => ({
                ...provided,
                width: '6.5rem',
              }),
            }}
            isClearable={false}
            isSearchable={false}
            placeholder={`${defaultValue.getMonth} 月`}
            onChange={handleStatusInputChangeMonth}
            options={monthOption}
          />
        </Col>
      }
    </Row>
  )
}

export default CustomYearAndMonthSelect
