import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { downloadFile } from '../../../../helpers'
import { ImageListPros } from './types'

export function ImageList({ images }: ImageListPros) {
  const [mainImages] = useState(images)

  return (
    <>
      <ul className="list-inline message-img  mb-0">
        {mainImages.map((img, key) => (
          <li key={key} className="list-inline-item message-img-list">
            <img
              src={img.url}
              alt="chat"
              className="rounded border"
              style={{ width: '100%', maxWidth: '300px' }}
            />

            <div className="message-img-link">
              <ul className="list-inline mb-0">
                <li className="list-inline-item">
                  <Link to="#">
                    <i
                      className="ri-download-2-line"
                      onClick={async () => await downloadFile(img)}
                    ></i>
                  </Link>
                </li>
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
