import { useState, useRef } from 'react'
import Button from './Button'
import './CSVUploader.css'

const CSVUploader = ({ onUpload, onClose }) => {
  const [dragOver, setDragOver] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(null)
  const fileInputRef = useRef(null)

  const expectedHeaders = [
    'firstName', 'lastName', 'email', 'phone', 'street', 
    'city', 'state', 'zipCode', 'country', 'company', 
    'jobTitle', 'interests', 'newsletter'
  ]

  const parseCSV = (csvText) => {
    const lines = csvText.trim().split('\n')
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
    
    const data = []
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''))
      const row = {}
      
      headers.forEach((header, index) => {
        let value = values[index] || ''
        
        // Handle special fields
        if (header === 'interests') {
          value = value ? value.split(';').map(i => i.trim()) : []
        } else if (header === 'newsletter') {
          value = value.toLowerCase() === 'true' || value === '1'
        }
        
        row[header] = value
      })
      data.push(row)
    }
    
    return { headers, data }
  }

  const validateData = (headers, data) => {
    const errors = []
    
    // Check required headers
    const missingHeaders = expectedHeaders.filter(h => 
      ['firstName', 'lastName', 'email', 'street', 'city', 'state', 'zipCode', 'country'].includes(h) && 
      !headers.includes(h)
    )
    
    if (missingHeaders.length > 0) {
      errors.push(`Missing required columns: ${missingHeaders.join(', ')}`)
    }
    
    // Validate data rows
    data.forEach((row, index) => {
      const rowNumber = index + 2 // +2 because index starts at 0 and we skip header row
      
      if (!row.firstName) errors.push(`Row ${rowNumber}: First name is required`)
      if (!row.lastName) errors.push(`Row ${rowNumber}: Last name is required`)
      if (!row.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email)) {
        errors.push(`Row ${rowNumber}: Valid email is required`)
      }
      if (!row.street) errors.push(`Row ${rowNumber}: Street address is required`)
      if (!row.city) errors.push(`Row ${rowNumber}: City is required`)
      if (!row.state) errors.push(`Row ${rowNumber}: State is required`)
      if (!row.zipCode) errors.push(`Row ${rowNumber}: ZIP code is required`)
      if (!row.country) errors.push(`Row ${rowNumber}: Country is required`)
    })
    
    return errors
  }

  const handleFile = async (file) => {
    if (!file) return
    
    if (!file.name.endsWith('.csv')) {
      alert('Please select a CSV file')
      return
    }
    
    setUploading(true)
    
    try {
      const text = await file.text()
      const { headers, data } = parseCSV(text)
      const errors = validateData(headers, data)
      
      if (errors.length > 0) {
        alert(`CSV validation errors:\n${errors.slice(0, 5).join('\n')}${errors.length > 5 ? `\n... and ${errors.length - 5} more errors` : ''}`)
        setUploading(false)
        return
      }
      
      setPreview({ headers, data, fileName: file.name })
    } catch (error) {
      alert('Error reading CSV file: ' + error.message)
    }
    
    setUploading(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    handleFile(file)
  }

  const handleFileInput = (e) => {
    const file = e.target.files[0]
    handleFile(file)
  }

  const handleUpload = () => {
    if (preview) {
      onUpload(preview.data)
      setPreview(null)
    }
  }

  const downloadTemplate = () => {
    const headers = expectedHeaders.join(',')
    const sampleData = [
      'John,Doe,john.doe@example.com,+1234567890,123 Main St,New York,NY,10001,USA,Tech Corp,Developer,Technology;Design,true',
      'Jane,Smith,jane.smith@example.com,+1987654321,456 Oak Ave,Los Angeles,CA,90210,USA,Design Inc,Designer,Design;Marketing,false'
    ]
    
    const csvContent = [headers, ...sampleData].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    
    const a = document.createElement('a')
    a.href = url
    a.download = 'form_template.csv'
    a.click()
    
    URL.revokeObjectURL(url)
  }

  return (
    <div className="csv-uploader">
      {/* <div className="csv-uploader__header">
        <h2>Bulk Form Upload</h2>
        <button className="csv-uploader__close" onClick={onClose}>×</button>
      </div> */}

      {!preview ? (
        <div className="csv-uploader__upload">
            <div className="csv-uploader__header">
                <h2>Bulk Form Upload</h2>
                <button className="csv-uploader__close" onClick={onClose}>×</button>
            </div>
          <div className="csv-uploader__template">
            <p>Need a template? <button onClick={downloadTemplate} className="csv-uploader__template-btn">Download CSV Template</button></p>
          </div>

          <div 
            className={`csv-uploader__dropzone ${dragOver ? 'csv-uploader__dropzone--active' : ''}`}
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="csv-uploader__dropzone-content">
              {uploading ? (
                <div>
                  <div className="csv-uploader__spinner"></div>
                  <p>Processing CSV file...</p>
                </div>
              ) : (
                <div>
                  <div className="csv-uploader__icon">📄</div>
                  <p>Drop your CSV file here or click to browse</p>
                  <p className="csv-uploader__hint">Supported format: .csv</p>
                </div>
              )}
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileInput}
            style={{ display: 'none' }}
          />

          <div className="csv-uploader__format">
            <h4>CSV Format Requirements:</h4>
            <div className="csv-uploader__columns">
              <div>
                <strong>Required columns:</strong>
                <ul>
                  <li>firstName, lastName, email</li>
                  <li>street, city, state, zipCode, country</li>
                </ul>
              </div>
              <div>
                <strong>Optional columns:</strong>
                <ul>
                  <li>phone, company, jobTitle</li>
                  <li>interests (semicolon-separated)</li>
                  <li>newsletter (true/false)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="csv-uploader__preview">
          <h3>Preview: {preview.fileName}</h3>
          <p>{preview.data.length} forms ready to import</p>
          
          <div className="csv-uploader__preview-table">
            <table>
              <thead>
                <tr>
                  {preview.headers.slice(0, 6).map(header => (
                    <th key={header}>{header}</th>
                  ))}
                  <th>...</th>
                </tr>
              </thead>
              <tbody>
                {preview.data.slice(0, 5).map((row, index) => (
                  <tr key={index}>
                    {preview.headers.slice(0, 6).map(header => (
                      <td key={header}>{
                        Array.isArray(row[header]) ? row[header].join(', ') : 
                        typeof row[header] === 'boolean' ? (row[header] ? 'Yes' : 'No') :
                        row[header] || '-'
                      }</td>
                    ))}
                    <td>...</td>
                  </tr>
                ))}
                {preview.data.length > 5 && (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', fontStyle: 'italic' }}>
                      ... and {preview.data.length - 5} more rows
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="csv-uploader__actions">
            <Button variant="outline" onClick={() => setPreview(null)}>
              Choose Different File
            </Button>
            <Button onClick={handleUpload}>
              Import {preview.data.length} Forms
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CSVUploader