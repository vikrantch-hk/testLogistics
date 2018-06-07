import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntity } from './awb-status.reducer';
import { IAwbStatus } from 'app/shared/model/awb-status.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAwbStatusDetailProps {
  getEntity: ICrudGetAction<IAwbStatus>;
  awbStatus: IAwbStatus;
  match: any;
}

export class AwbStatusDetail extends React.Component<IAwbStatusDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { awbStatus } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            AwbStatus [<b>{awbStatus.id}</b>]
          </h2>
          <Row size="md">
            <dl className="jh-entity-details">
              <dt>
                <span id="awbStatus">Awb Status</span>
              </dt>
              <dd>{awbStatus.awbStatus}</dd>
            </dl>
          </Row>
          <Button tag={Link} to="/entity/awb-status" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          <Button tag={Link} to={`/entity/awb-status/${awbStatus.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ awbStatus }) => ({
  awbStatus: awbStatus.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(AwbStatusDetail);
