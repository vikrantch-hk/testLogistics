import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './courier-attributes.reducer';
import { ICourierAttributes } from 'app/shared/model/courier-attributes.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICourierAttributesDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class CourierAttributesDetail extends React.Component<ICourierAttributesDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { courierAttributesEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            CourierAttributes [<b>{courierAttributesEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="prepaidAir">Prepaid Air</span>
            </dt>
            <dd>{courierAttributesEntity.prepaidAir ? 'true' : 'false'}</dd>
            <dt>
              <span id="prepaidGround">Prepaid Ground</span>
            </dt>
            <dd>{courierAttributesEntity.prepaidGround ? 'true' : 'false'}</dd>
            <dt>
              <span id="codAir">Cod Air</span>
            </dt>
            <dd>{courierAttributesEntity.codAir ? 'true' : 'false'}</dd>
            <dt>
              <span id="codGround">Cod Ground</span>
            </dt>
            <dd>{courierAttributesEntity.codGround ? 'true' : 'false'}</dd>
            <dt>
              <span id="reverseAir">Reverse Air</span>
            </dt>
            <dd>{courierAttributesEntity.reverseAir ? 'true' : 'false'}</dd>
            <dt>
              <span id="reverseGround">Reverse Ground</span>
            </dt>
            <dd>{courierAttributesEntity.reverseGround ? 'true' : 'false'}</dd>
            <dt>
              <span id="cardOnDeliveryAir">Card On Delivery Air</span>
            </dt>
            <dd>{courierAttributesEntity.cardOnDeliveryAir ? 'true' : 'false'}</dd>
            <dt>
              <span id="cardOnDeliveryGround">Card On Delivery Ground</span>
            </dt>
            <dd>{courierAttributesEntity.cardOnDeliveryGround ? 'true' : 'false'}</dd>
          </dl>
          <Button tag={Link} to="/entity/courier-attributes" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/courier-attributes/${courierAttributesEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ courierAttributes }: IRootState) => ({
  courierAttributesEntity: courierAttributes.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CourierAttributesDetail);
