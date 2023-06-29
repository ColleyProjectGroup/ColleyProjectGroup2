import { useCallback, useEffect, useRef, useState, useMemo } from 'react'
import styled from 'styles/components/admin/productAddForm.module.scss'
import { ProductAddBody, ProductAddFormProps } from 'types/index'

export const ProductAddForm = ({ product, onSubmit }: ProductAddFormProps) => {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [tagStr, setTagStr] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const [discountRate, setDiscountRate] = useState<string>('')
  const [isValid, setIsValid] = useState<boolean>(false)
  const isAddMode = useMemo<boolean>(() => !product, [product])

  useEffect(() => {
    if (product) {
      const {
        title,
        description,
        tags,
        price,
        discountRate,
        thumbnail,
        photo
      } = product
      console.log(thumbnail)
      setTitle(title)
      setDescription(description)
      setTagStr(tags.join(', '))
      setPrice(price.toString())
      setDiscountRate(discountRate ? discountRate.toString() : '')
      setThumbnailImage(thumbnail ? thumbnail : '')
      setDetailImage(photo ? photo : '')
    }
  }, [product])

  // 유효성 검사
  useEffect(() => {
    if (
      title &&
      description &&
      price &&
      tagStr &&
      !isNaN(parseInt(price)) &&
      !isNaN(parseInt(discountRate === '' ? '0' : discountRate)) &&
      parseInt(price) > 0
    ) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }, [title, description, price, tagStr, discountRate])

  // 대표이미지
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [thumbnailImage, setThumbnailImage] = useState<string | null>(null)

  // 상세이미지
  const detailInputRef = useRef<HTMLInputElement | null>(null)
  const [detailImage, setDetailImage] = useState<string | null>(null)

  // 이미지 프리뷰 설정
  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id
    onChangeImage(e, id === 'thumbnail-upload')
  }

  // 이미지 convert base64
  const onChangeImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, isThumb: boolean) => {
      if (!e.target.files?.length) {
        return
      }
      const reader = new FileReader()

      reader.onloadend = () => {
        const base64 = reader.result
        if (base64) {
          isThumb
            ? setThumbnailImage(base64.toString())
            : setDetailImage(base64.toString())
        }
      }

      reader.readAsDataURL(e.target.files[0])
    },
    []
  )

  const onClickThumbnailImageUpload = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    if (!fileInputRef.current) {
      return
    }
    fileInputRef.current.click()
  }, [])

  const onClickDetailImageUpload = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    if (!detailInputRef.current) {
      return
    }
    detailInputRef.current.click()
  }, [])

  const handleSumitAddForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isValid) return
    const tags: string[] = tagStr.toUpperCase().split(', ')
    let newProduct: ProductAddBody
    if (isAddMode) {
      newProduct = {
        title,
        description,
        tags,
        price: parseInt(price),
        discountRate: parseInt(discountRate === '' ? '0' : discountRate),
        thumbnailBase64: thumbnailImage,
        photoBase64: detailImage
      }
    } else {
      newProduct = {
        id: product?.id,
        title,
        description,
        tags,
        price: parseInt(price),
        discountRate: parseInt(discountRate === '' ? '0' : discountRate),
        ...(thumbnailImage !== product?.thumbnail
          ? { thumbnailBase64: thumbnailImage }
          : {}),
        ...(detailImage !== product?.photo ? { photoBase64: detailImage } : {})
      }
    }

    onSubmit(newProduct)
  }

  return (
    <form
      className={styled['form-wrapper']}
      onSubmit={handleSumitAddForm}>
      <label>
        상품명
        <input
          value={title}
          type="text"
          placeholder="상품명 입력 *"
          onChange={e => setTitle(e.target.value)}
        />
      </label>
      <label>
        상품설명
        <textarea
          value={description}
          placeholder="상품설명 입력 *"
          onChange={e => setDescription(e.target.value)}
          maxLength={100}
        />
      </label>
      <label>
        태그
        <input
          value={tagStr}
          type="text"
          placeholder="태그는 , 로 구분하여 입력 *"
          onChange={e => setTagStr(e.target.value)}
        />
      </label>
      <div className={styled['input-row']}>
        <label>
          가격
          <input
            value={price ?? ''}
            type="number"
            placeholder="가격 입력 *"
            onChange={e => setPrice(e.target.value.trim())}
          />
        </label>
        <label>
          할인율
          <input
            value={discountRate ?? ''}
            type="number"
            placeholder="할인율 입력(0~99)"
            max={99}
            onChange={e => setDiscountRate(e.target.value.trim())}
          />
        </label>
      </div>

      <div className={styled['input-row']}>
        <label htmlFor="">
          대표 이미지
          <input
            id="thumbnail-upload"
            ref={fileInputRef}
            type="file"
            onChange={handleUploadImage}
          />
          <button
            type="button"
            className={`${styled.white}`}
            onClick={onClickThumbnailImageUpload}>
            이미지 업로드
          </button>
          <div
            className={
              thumbnailImage
                ? `${styled.thumbnail} ${styled.show}`
                : `${styled.thumbnail}`
            }
            style={{ backgroundImage: `url(${thumbnailImage})` }}></div>
        </label>

        <label htmlFor="">
          상세 이미지
          <input
            id="detail-upload"
            ref={detailInputRef}
            type="file"
            onChange={handleUploadImage}
          />
          <button
            type="button"
            className={`${styled.white}`}
            onClick={onClickDetailImageUpload}>
            이미지 업로드
          </button>
          <div
            className={
              detailImage
                ? `${styled.detail} ${styled.show}`
                : `${styled.detail}`
            }
            style={{ backgroundImage: `url(${detailImage})` }}></div>
        </label>
      </div>

      <button
        className={styled['black']}
        disabled={!isValid}>
        저장
      </button>
    </form>
  )
}
