import { AdminMoreButtonProps } from 'types/index'
import styled from 'styles/components/admin/productItem.module.scss'

export const AdminMoreButton = ({
  isShow,
  onToggleMenu,
  onClickEdit,
  onClickDelete
}: AdminMoreButtonProps) => {
  const handleClickMenu = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    onToggleMenu()
  }

  const handleClickEdit = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    onClickEdit()
  }

  const handleClickDelete = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    onClickDelete()
  }

  return (
    <div className={styled['menu-wrapper']}>
      <div
        className="material-icons"
        onClick={handleClickMenu}>
        more_vert
      </div>
      <div
        className={`${styled['dropdown-menu']} ${
          isShow ? styled['show'] : ''
        }`}>
        <ul>
          <li onClick={handleClickEdit}>상품 수정</li>
          <li onClick={handleClickDelete}>상품 삭제</li>
        </ul>
      </div>
    </div>
  )
}
