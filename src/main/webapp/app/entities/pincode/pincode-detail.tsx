import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntity } from './pincode.reducer';
import { IPincode } from 'app/shared/model/pincode.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPincodeDetailProps {
  getEntity: ICrudGetAction<IPincode>;
  pincode: IPincode;
  match: any;
}

export class PincodeDetail extends React.Component<IPincodeDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { pincode } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Pincode [<b>{pincode.id}</b>]
          </h2>
          <Row size="md">
            <dl className="jh-entity-details">
              <dt>
                <span id="pincode">Pincode</span>
              </dt>
              <dd>{pincode.pincode}</dd>
              <dt>
                <span id="region">Region</span>
              </dt>
              <dd>{pincode.region}</dd>
              <dt>
                <span id="locality">Locality</span>
              </dt>
              <dd>{pincode.locality}</dd>
              <dt>
                <span id="lastMileCost">Last Mile Cost</span>
              </dt>
              <dd>{pincode.lastMileCost}</dd>
              <dt>
                <span id="tier">Tier</span>
              </dt>
              <dd>{pincode.tier}</dd>
              <dt>City</dt>
              <dd>{pincode.cityName ? pincode.cityName : ''}</dd>
              <dt>State</dt>
              <dd>{pincode.stateName ? pincode.stateName : ''}</dd>
              <dt>Zone</dt>
              <dd>{pincode.zoneName ? pincode.zoneName : ''}</dd>
              <dt>Hub</dt>
              <dd>{pincode.hubName ? pincode.hubName : ''}</dd>
            </dl>
          </Row>
          <Button tag={Link} to="/entity/pincode" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          <Button tag={Link} to={`/entity/pincode/${pincode.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ pincode }) => ({
  pincode: pincode.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(PincodeDetail);
