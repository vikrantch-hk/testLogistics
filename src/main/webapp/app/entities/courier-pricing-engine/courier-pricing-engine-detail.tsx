import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './courier-pricing-engine.reducer';
import { ICourierPricingEngine } from 'app/shared/model/courier-pricing-engine.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICourierPricingEngineDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class CourierPricingEngineDetail extends React.Component<ICourierPricingEngineDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { courierPricingEngineEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            CourierPricingEngine [<b>{courierPricingEngineEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="firstBaseWt">First Base Wt</span>
            </dt>
            <dd>{courierPricingEngineEntity.firstBaseWt}</dd>
            <dt>
              <span id="firstBaseCost">First Base Cost</span>
            </dt>
            <dd>{courierPricingEngineEntity.firstBaseCost}</dd>
            <dt>
              <span id="secondBaseWt">Second Base Wt</span>
            </dt>
            <dd>{courierPricingEngineEntity.secondBaseWt}</dd>
            <dt>
              <span id="secondBaseCost">Second Base Cost</span>
            </dt>
            <dd>{courierPricingEngineEntity.secondBaseCost}</dd>
            <dt>
              <span id="additionalWt">Additional Wt</span>
            </dt>
            <dd>{courierPricingEngineEntity.additionalWt}</dd>
            <dt>
              <span id="additionalCost">Additional Cost</span>
            </dt>
            <dd>{courierPricingEngineEntity.additionalCost}</dd>
            <dt>
              <span id="fuelSurcharge">Fuel Surcharge</span>
            </dt>
            <dd>{courierPricingEngineEntity.fuelSurcharge}</dd>
            <dt>
              <span id="minCodCharges">Min Cod Charges</span>
            </dt>
            <dd>{courierPricingEngineEntity.minCodCharges}</dd>
            <dt>
              <span id="codCutoffAmount">Cod Cutoff Amount</span>
            </dt>
            <dd>{courierPricingEngineEntity.codCutoffAmount}</dd>
            <dt>
              <span id="variableCodCharges">Variable Cod Charges</span>
            </dt>
            <dd>{courierPricingEngineEntity.variableCodCharges}</dd>
            <dt>
              <span id="validUpto">Valid Upto</span>
            </dt>
            <dd>
              <TextFormat value={courierPricingEngineEntity.validUpto} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>Courier</dt>
            <dd>{courierPricingEngineEntity.courierName ? courierPricingEngineEntity.courierName : ''}</dd>
            <dt>Warehouse</dt>
            <dd>{courierPricingEngineEntity.warehouseName ? courierPricingEngineEntity.warehouseName : ''}</dd>
            <dt>Region Type</dt>
            <dd>{courierPricingEngineEntity.regionTypeName ? courierPricingEngineEntity.regionTypeName : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/courier-pricing-engine" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/courier-pricing-engine/${courierPricingEngineEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ courierPricingEngine }: IRootState) => ({
  courierPricingEngineEntity: courierPricingEngine.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CourierPricingEngineDetail);
