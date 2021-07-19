import React, { ChangeEventHandler } from 'react';
import { Grid, Row, Col, DateRangePicker } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

import { Country } from '../types';
import styles from './ControlPanel.module.css';

export interface ControlPanelProps {
  countries: Country[];
  selectedCountry: string;
  handleCountry: ChangeEventHandler<HTMLSelectElement>;
  handleDateRange(ev: Date[]): void;
  handleCalendarOpen(): void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  countries,
  handleCountry,
  selectedCountry,
  handleDateRange,
  handleCalendarOpen,
}) => {
  return (
    <Grid fluid className={styles.container}>
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <label className={styles.label}>Select Country</label>
          <select
            value={selectedCountry}
            onChange={handleCountry}
            className={styles.select}
          >
            <option value="all">All</option>
            {countries.map((country: Country, index: number) => (
              <option key={index} value={JSON.stringify(country)}>
                {country.properties.ADMIN}
              </option>
            ))}
          </select>
        </Col>
        <Col xs={24} md={12}>
          <label className={styles.label}>Select Date Range</label>
          <DateRangePicker
            onChange={(date: any) => handleDateRange(date as Date[])}
            onOpen={handleCalendarOpen}
          />
        </Col>
      </Row>
    </Grid>
  );
};

export default ControlPanel;
