import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntity } from './pincode-region-zone.reducer';
import { IPincodeRegionZone } from 'app/shared/model/pincode-region-zone.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPincodeRegionZoneDetailProps {
  getEntity: ICrudGetAction<IPincodeRegionZone>;
  pincodeRegionZone: IPincodeRegionZone;
  match: any;
}

export class PincodeRegionZoneDetail extends React.Component<IPincodeRegionZoneDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { pincodeRegionZone } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            PincodeRegionZone [<b>{pincodeRegionZone.id}</b>]
          </h2>
          <Row size="md">
            <dl className="jh-entity-details">
              <dt>Region Type</dt>
              <dd>{pincodeRegionZone.regionTypeName ? pincodeRegionZone.regionTypeName : ''}</dd>
              <dt>Courier Group</dt>
              <dd>{pincodeRegionZone.courierGroupName ? pincodeRegionZone.courierGroupName : ''}</dd>
              <dt>Vendor WH Courier Mapping</dt>
              <dd>{pincodeRegionZone.vendorWHCourierMappingId ? pincodeRegionZone.vendorWHCourierMappingId : ''}</dd>
            </dl>
          </Row>
          <Button tag={Link} to="/entity/pincode-region-zone" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          <Button tag={Link} to={`/entity/pincode-region-zone/${pincodeRegionZone.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ pincodeRegionZone }) => ({
  pincodeRegionZone: pincodeRegionZone.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(PincodeRegionZoneDetail);
