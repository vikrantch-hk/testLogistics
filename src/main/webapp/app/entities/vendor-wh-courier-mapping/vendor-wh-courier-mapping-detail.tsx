import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './vendor-wh-courier-mapping.reducer';
import { IVendorWHCourierMapping } from 'app/shared/model/vendor-wh-courier-mapping.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVendorWHCourierMappingDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class VendorWHCourierMappingDetail extends React.Component<IVendorWHCourierMappingDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { vendorWHCourierMappingEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            VendorWHCourierMapping [<b>{vendorWHCourierMappingEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="active">Active</span>
            </dt>
            <dd>{vendorWHCourierMappingEntity.active ? 'true' : 'false'}</dd>
            <dt>Vendor</dt>
            <dd>{vendorWHCourierMappingEntity.vendorName ? vendorWHCourierMappingEntity.vendorName : ''}</dd>
            <dt>Warehouse</dt>
            <dd>{vendorWHCourierMappingEntity.warehouseName ? vendorWHCourierMappingEntity.warehouseName : ''}</dd>
            <dt>Courier Channel</dt>
            <dd>{vendorWHCourierMappingEntity.courierChannelName ? vendorWHCourierMappingEntity.courierChannelName : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/vendor-wh-courier-mapping" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/vendor-wh-courier-mapping/${vendorWHCourierMappingEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ vendorWHCourierMapping }: IRootState) => ({
  vendorWHCourierMappingEntity: vendorWHCourierMapping.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VendorWHCourierMappingDetail);
