import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './pincode-region-zone.reducer';
import { IPincodeRegionZone } from 'app/shared/model/pincode-region-zone.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPincodeRegionZoneDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class PincodeRegionZoneDetail extends React.Component<IPincodeRegionZoneDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { pincodeRegionZoneEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            PincodeRegionZone [<b>{pincodeRegionZoneEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>Region Type</dt>
            <dd>{pincodeRegionZoneEntity.regionTypeName ? pincodeRegionZoneEntity.regionTypeName : ''}</dd>
            <dt>Courier Group</dt>
            <dd>{pincodeRegionZoneEntity.courierGroupName ? pincodeRegionZoneEntity.courierGroupName : ''}</dd>
            <dt>Vendor WH Courier Mapping</dt>
            <dd>{pincodeRegionZoneEntity.vendorWHCourierMappingId ? pincodeRegionZoneEntity.vendorWHCourierMappingId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/pincode-region-zone" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/pincode-region-zone/${pincodeRegionZoneEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ pincodeRegionZone }: IRootState) => ({
  pincodeRegionZoneEntity: pincodeRegionZone.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PincodeRegionZoneDetail);
