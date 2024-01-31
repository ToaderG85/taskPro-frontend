import React from "react";
import MoveCardPopUp from "../moveCardPopUp/MoveCardPopUp";
import { useSelector, useDispatch } from "react-redux";
import svgSprite from "../../assets/svg/symbol-defs.svg";
import styles from "./Card.module.css";
import { selectModal, getModalType, getUserToken } from "../../redux/selectors";
import { removeCard } from "../../redux/operations";
import { openModal } from "../../redux/modalSlice";
import AddCard from "../AddCard/AddCard";

export default function Card({ card, cardOwner, columns, onCardDrop }) {
  const dispatch = useDispatch();
  const token = useSelector(getUserToken);
  const modal = useSelector(selectModal);
  const modalType = useSelector(getModalType);
  console.log(typeof onCardDrop);

  const formatedData = new Date(card?.deadline).toLocaleDateString();
  const text =
    card?.labelColor === "#8FA1D0"
      ? "Low"
      : card?.labelColor === "#E09CB5"
      ? "Medium"
      : card?.labelColor === "#BEDBB0"
      ? "High"
      : "Without";

  const handleOpenEditModal = () => {
    try {
      dispatch(openModal({ data: "card" }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenMoveCardModal = () => {
    try {
      dispatch(openModal({ data: "popup" }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCard = () => {
    try {
      dispatch(removeCard({ token, cardId: card._id }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div
      className={styles.card}
      onDrop={(event) => onCardDrop({ x: 0, y: event.clientY })}
      onDragOver={handleDragOver}
      draggable
    >
      <div
        className={styles.card__color}
        style={{ background: `${card?.labelColor}` }}
      ></div>
      <div>
        <h1 className={styles.title}>{card?.title}</h1>
        <p className={styles.text}>{card?.description}</p>
        <div className={styles.line}></div>
        <div className={styles.card__info}>
          <div className={styles.data}>
            Priority{" "}
            <div className={styles.deadline}>
              <div
                className={styles.circle}
                style={{ background: `${card?.labelColor}` }}
              ></div>
              {text}
            </div>
          </div>
          <div className={styles.data}>
            Deadline
            <div className={styles.deadline}>{formatedData}</div>
          </div>
          <div className={styles.btn__container}>
            <svg
              width={18}
              height={18}
              className={styles.btn}
              onClick={handleOpenMoveCardModal}
            >
              <use href={svgSprite + "#icon-arrow-circle-broken-right"} />
            </svg>
            <svg
              width={18}
              height={18}
              className={styles.btn}
              onClick={handleOpenEditModal}
            >
              <use href={svgSprite + "#icon-pencil-01"} />
            </svg>
            <svg
              width={18}
              height={18}
              className={styles.btn}
              onClick={handleDeleteCard}
            >
              <use href={svgSprite + "#icon-trash-06"} />
            </svg>
          </div>
        </div>
      </div>
      {modal && modalType === "card" && (
        <AddCard
          title="Edit Card"
          textButton="Edit"
          // de modificat cu o valore reala
          cardId={card._id}
        />
      )}
      {modal && modalType === "popup" && (
        <MoveCardPopUp
          // de modificat  cu o valoare reala
          cardOwner={cardOwner}
          columns={columns}
          cardId={card._id}
        />
      )}
    </div>
  );
}
