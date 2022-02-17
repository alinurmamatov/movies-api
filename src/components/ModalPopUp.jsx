import React from "react";
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import '../App.css';


class ModalPopUp extends React.Component{
    constructor(){
        super()
        this.state = {
            modal: true
        }
    }

    closeBtn(){
        this.setState({modal: !this.state.modal});
        this.props.modalHandle(!this.state.modal);
    }

    toggleHandler(){
        this.setState({modal: !this.state.modal});
        this.props.modalHandle(!this.state.modal);
    }

    render(){
        const {modal} = this.state;
        const {name, profile_path, known_for, popularity} = this.props.dataActor[0];
        const poster = known_for.map((posterImg) => {
            return ( <img className="poster" src={"https://image.tmdb.org/t/p/w500/"+posterImg.poster_path} />)
        });
        return (
            <>
            <Modal isOpen={modal} toggle={() => this.toggleHandler()}>
                <ModalHeader>{name}</ModalHeader>
                <ModalBody className="modal-body">
                    <div>
                        <img src={"https://image.tmdb.org/t/p/w500/"+profile_path} className="pop-up-img"/>
                        <p className="popularity">Popularity: {popularity.toFixed(2)}</p>
                    </div>
                    <h5>Famous Movies:</h5>
                    <ul className="moviesList">
                        <li>{poster}</li>
                    </ul>
                </ModalBody>
                <ModalFooter><button onClick={() => this.closeBtn()} className="closeBtn">Close</button></ModalFooter>
            </Modal>
            </>
        )
    }
}

export default ModalPopUp;