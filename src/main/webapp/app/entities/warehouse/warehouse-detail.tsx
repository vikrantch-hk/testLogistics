import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntity } from './warehouse.reducer';
import { IWarehouse } from 'app/shared/model/warehouse.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IWarehouseDetailProps {
  getEntity: ICrudGetAction<IWarehouse>;
  warehouse: IWarehouse;
  match: any;
}

export class WarehouseDetail extends React.Component<IWarehouseDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { warehouse } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Warehouse [<b>{warehouse.id}</b>]
          </h2>
          <Row size="md">
            <dl className="jh-entity-details">
              <dt>
                <span id="name">Name</span>
              </dt>
              <dd>{warehouse.name}</dd>
              <dt>
                <span id="pincode">Pincode</span>
              </dt>
              <dd>{warehouse.pincode}</dd>
            </dl>
          </Row>
          <Button tag={Link} to="/entity/warehouse" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          <Button tag={Link} to={`/entity/warehouse/${warehouse.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ warehouse }) => ({
  warehouse: warehouse.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseDetail);
