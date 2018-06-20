import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './warehouse.reducer';
import { IWarehouse } from 'app/shared/model/warehouse.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IWarehouseDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class WarehouseDetail extends React.Component<IWarehouseDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { warehouseEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Warehouse [<b>{warehouseEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">Name</span>
            </dt>
            <dd>{warehouseEntity.name}</dd>
            <dt>
              <span id="pincode">Pincode</span>
            </dt>
            <dd>{warehouseEntity.pincode}</dd>
          </dl>
          <Button tag={Link} to="/entity/warehouse" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/warehouse/${warehouseEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ warehouse }: IRootState) => ({
  warehouseEntity: warehouse.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseDetail);
