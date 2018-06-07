import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IPincodeCourierMapping } from 'app/shared/model/pincode-courier-mapping.model';
import { getEntity, deleteEntity } from './pincode-courier-mapping.reducer';

export interface IPincodeCourierMappingDeleteDialogProps {
  getEntity: ICrudGetAction<IPincodeCourierMapping>;
  deleteEntity: ICrudDeleteAction<IPincodeCourierMapping>;
  pincodeCourierMapping: IPincodeCourierMapping;
  match: any;
  history: any;
}

export class PincodeCourierMappingDeleteDialog extends React.Component<IPincodeCourierMappingDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.pincodeCourierMapping.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { pincodeCourierMapping } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>Confirm delete operation</ModalHeader>
        <ModalBody>Are you sure you want to delete this PincodeCourierMapping?</ModalBody>
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

const mapStateToProps = ({ pincodeCourierMapping }) => ({
  pincodeCourierMapping: pincodeCourierMapping.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

export default connect(mapStateToProps, mapDispatchToProps)(PincodeCourierMappingDeleteDialog);
