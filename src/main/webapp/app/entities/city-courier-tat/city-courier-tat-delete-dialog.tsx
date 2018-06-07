import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { ICityCourierTAT } from 'app/shared/model/city-courier-tat.model';
import { getEntity, deleteEntity } from './city-courier-tat.reducer';

export interface ICityCourierTATDeleteDialogProps {
  getEntity: ICrudGetAction<ICityCourierTAT>;
  deleteEntity: ICrudDeleteAction<ICityCourierTAT>;
  cityCourierTAT: ICityCourierTAT;
  match: any;
  history: any;
}

export class CityCourierTATDeleteDialog extends React.Component<ICityCourierTATDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.cityCourierTAT.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { cityCourierTAT } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>Confirm delete operation</ModalHeader>
        <ModalBody>Are you sure you want to delete this CityCourierTAT?</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />&nbsp; Cancel
          </Button>
          <Button color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />&nbsp; Delete
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ cityCourierTAT }) => ({
  cityCourierTAT: cityCourierTAT.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

export default connect(mapStateToProps, mapDispatchToProps)(CityCourierTATDeleteDialog);
