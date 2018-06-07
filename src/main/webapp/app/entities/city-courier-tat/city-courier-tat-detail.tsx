import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntity } from './city-courier-tat.reducer';
import { ICityCourierTAT } from 'app/shared/model/city-courier-tat.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICityCourierTATDetailProps {
  getEntity: ICrudGetAction<ICityCourierTAT>;
  cityCourierTAT: ICityCourierTAT;
  match: any;
}

export class CityCourierTATDetail extends React.Component<ICityCourierTATDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { cityCourierTAT } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            CityCourierTAT [<b>{cityCourierTAT.id}</b>]
          </h2>
          <Row size="md">
            <dl className="jh-entity-details">
              <dt>
                <span id="turnaroundTime">Turnaround Time</span>
              </dt>
              <dd>{cityCourierTAT.turnaroundTime}</dd>
            </dl>
          </Row>
          <Button tag={Link} to="/entity/city-courier-tat" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          <Button tag={Link} to={`/entity/city-courier-tat/${cityCourierTAT.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ cityCourierTAT }) => ({
  cityCourierTAT: cityCourierTAT.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(CityCourierTATDetail);
