import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './awb.reducer';
import { IAwb } from 'app/shared/model/awb.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAwbDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class AwbDetail extends React.Component<IAwbDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { awbEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Awb [<b>{awbEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="awbNumber">Awb Number</span>
            </dt>
            <dd>{awbEntity.awbNumber}</dd>
            <dt>
              <span id="awbBarCode">Awb Bar Code</span>
            </dt>
            <dd>{awbEntity.awbBarCode}</dd>
            <dt>
              <span id="cod">Cod</span>
            </dt>
            <dd>{awbEntity.cod ? 'true' : 'false'}</dd>
            <dt>
              <span id="createDate">Create Date</span>
            </dt>
            <dd>
              <TextFormat value={awbEntity.createDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="returnAwbNumber">Return Awb Number</span>
            </dt>
            <dd>{awbEntity.returnAwbNumber}</dd>
            <dt>
              <span id="returnAwbBarCode">Return Awb Bar Code</span>
            </dt>
            <dd>{awbEntity.returnAwbBarCode}</dd>
            <dt>
              <span id="isBrightAwb">Is Bright Awb</span>
            </dt>
            <dd>{awbEntity.isBrightAwb ? 'true' : 'false'}</dd>
          </dl>
          <Button tag={Link} to="/entity/awb" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/awb/${awbEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ awb }: IRootState) => ({
  awbEntity: awb.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AwbDetail);
