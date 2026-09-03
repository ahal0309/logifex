'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return redirect(`/admin/login?message=Invalid email or password. Please try again.`)
  }

  // Set the activity cookie immediately on login so middleware recognises this as a fresh session
  cookies().set('admin_last_active', String(Date.now()), {
    httpOnly: true,
    sameSite: 'lax',
    path: '/admin',
    maxAge: 60 * 60, // 1 hour max
  })

  return redirect('/admin/dashboard')
}

export async function logout() {
  const supabase = createClient()
  await supabase.auth.signOut()
  return redirect('/admin/login')
}

export async function saveContent(formData: FormData) {
  const supabase = createClient()
  
  const page = formData.get('page') as string
  const section = formData.get('section') as string
  const content_key = formData.get('content_key') as string
  const content_value = formData.get('content_value') as string
  const content_type = formData.get('content_type') as string || 'text'
  const group_id = formData.get('group_id') as string | null

  // Ensure unique constraint parameters are provided
  if (!page || !section || !content_key) {
    throw new Error('Missing required fields')
  }

  const { error } = await supabase
    .from('site_content')
    .upsert(
      { 
        page, 
        section, 
        content_key, 
        content_value, 
        content_type, 
        group_id,
        updated_at: new Date().toISOString()
      },
      { onConflict: 'page,section,content_key,group_id' }
    )

  if (error) {
    console.error(error)
    throw new Error(error.message)
  }

  revalidatePath('/', 'layout')
}

export async function addCareer(formData: FormData) {
  const supabase = createClient()
  
  const title = formData.get('title') as string
  const location = formData.get('location') as string
  const type = formData.get('type') as string
  const department = formData.get('department') as string
  const description = formData.get('description') as string
  const is_active = formData.get('is_active') === 'true'
  const display_order = parseInt(formData.get('display_order') as string) || 0

  if (!title || !location || !type || !department || !description) {
    throw new Error('All fields are required')
  }

  const { error } = await supabase
    .from('careers')
    .insert([{ title, location, type, department, description, is_active, display_order }])

  if (error) {
    console.error(error)
    throw new Error(error.message)
  }

  revalidatePath('/', 'layout')
  revalidatePath('/admin/careers')
  redirect('/admin/careers')
}

export async function deleteCareer(id: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from('careers')
    .delete()
    .eq('id', id)
    
  if (error) return { error: error.message }
  revalidatePath('/', 'layout')
  revalidatePath('/admin/careers')
  return { success: true }
}

export async function toggleCareerStatus(id: string, currentStatus: boolean) {
  const supabase = createClient()
  const { error } = await supabase
    .from('careers')
    .update({ is_active: !currentStatus })
    .eq('id', id)
    
  if (error) return { error: error.message }
  revalidatePath('/', 'layout')
  revalidatePath('/admin/careers')
  return { success: true }
}

export async function uploadImage(formData: FormData) {
  const file = formData.get('image') as File
  if (!file) return { error: 'No file provided' }
  
  const supabase = createClient()
  
  // Generate a unique filename
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
  const buffer = await file.arrayBuffer()
  
  const { data, error } = await supabase.storage
    .from('public-assets')
    .upload(fileName, buffer, { contentType: file.type })
    
  if (error) return { error: error.message }
  
  const { data: publicUrlData } = supabase.storage
    .from('public-assets')
    .getPublicUrl(fileName)
    
  revalidatePath('/admin/images')
  return { success: true, url: publicUrlData.publicUrl }
}

export async function addService(formData: FormData) {
  const supabase = createClient()
  
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const supporting_text = formData.get('supporting_text') as string
  const image_url = formData.get('image_url') as string
  const href = formData.get('href') as string
  const is_active = formData.get('is_active') === 'true'
  const display_order = parseInt(formData.get('display_order') as string) || 0

  if (!title || !description || !supporting_text || !image_url || !href) {
    throw new Error('All fields are required')
  }

  const { error } = await supabase
    .from('services')
    .insert([{ title, description, supporting_text, image_url, href, is_active, display_order }])

  if (error) {
    console.error(error)
    throw new Error(error.message)
  }

  revalidatePath('/')
  revalidatePath('/services')
  revalidatePath('/admin/services')
  redirect('/admin/services')
}

export async function deleteService(id: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id)
    
  if (error) return { error: error.message }
  revalidatePath('/')
  revalidatePath('/services')
  revalidatePath('/admin/services')
  return { success: true }
}

export async function toggleServiceStatus(id: string, currentStatus: boolean) {
  const supabase = createClient()
  const { error } = await supabase
    .from('services')
    .update({ is_active: !currentStatus })
    .eq('id', id)
    
  if (error) return { error: error.message }
  revalidatePath('/')
  revalidatePath('/services')
  revalidatePath('/admin/services')
  return { success: true }
}

export async function addIndustry(formData: FormData) {
  const supabase = createClient()
  
  const title = formData.get('title') as string
  const tag = formData.get('tag') as string
  const description = formData.get('description') as string
  const image_url = formData.get('image_url') as string
  const is_active = formData.get('is_active') === 'true'
  const display_order = parseInt(formData.get('display_order') as string) || 0

  if (!title || !tag || !description || !image_url) {
    throw new Error('All fields are required')
  }

  const { error } = await supabase
    .from('industries')
    .insert([{ title, tag, description, image_url, is_active, display_order }])

  if (error) {
    console.error(error)
    throw new Error(error.message)
  }

  revalidatePath('/about')
  revalidatePath('/admin/industries')
  redirect('/admin/industries')
}

export async function deleteIndustry(id: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from('industries')
    .delete()
    .eq('id', id)
    
  if (error) return { error: error.message }
  revalidatePath('/about')
  revalidatePath('/admin/industries')
  return { success: true }
}

export async function toggleIndustryStatus(id: string, currentStatus: boolean) {
  const supabase = createClient()
  const { error } = await supabase
    .from('industries')
    .update({ is_active: !currentStatus })
    .eq('id', id)
    
  if (error) return { error: error.message }
  revalidatePath('/about')
  revalidatePath('/admin/industries')
  return { success: true }
}

export async function updateCareer(formData: FormData) {
  const supabase = createClient()
  
  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const location = formData.get('location') as string
  const type = formData.get('type') as string
  const department = formData.get('department') as string
  const description = formData.get('description') as string
  const is_active = formData.get('is_active') === 'true'
  const display_order = parseInt(formData.get('display_order') as string) || 0

  if (!id || !title || !location || !type || !department || !description) {
    throw new Error('All fields are required')
  }

  const { error } = await supabase
    .from('careers')
    .update({ title, location, type, department, description, is_active, display_order })
    .eq('id', id)

  if (error) {
    console.error(error)
    throw new Error(error.message)
  }

  revalidatePath('/careers')
  revalidatePath('/admin/careers')
  redirect('/admin/careers')
}

export async function uploadHeroMedia(formData: FormData) {
  const file = formData.get('media') as File
  const page = formData.get('page') as string
  const section = formData.get('section') as string
  const content_key = formData.get('content_key') as string
  const content_type = formData.get('content_type') as string || 'image_url'

  if (!file || !page || !section || !content_key) {
    return { error: 'Missing required fields or file' }
  }

  const supabase = createClient()

  // Generate unique filename
  const fileExt = file.name.split('.').pop()
  const fileName = `hero_${page}_${content_key}_${Date.now()}.${fileExt}`
  const buffer = await file.arrayBuffer()

  const { error: uploadError } = await supabase.storage
    .from('public-assets')
    .upload(fileName, buffer, { contentType: file.type })

  if (uploadError) {
    return { error: uploadError.message }
  }

  const { data: publicUrlData } = supabase.storage
    .from('public-assets')
    .getPublicUrl(fileName)

  const newUrl = publicUrlData.publicUrl

  // Find all existing rows matching page+section+content_key
  const { data: existing } = await supabase
    .from('site_content')
    .select('id')
    .eq('page', page)
    .eq('section', section)
    .eq('content_key', content_key)

  if (existing && existing.length > 0) {
    // Delete all duplicates except the first
    if (existing.length > 1) {
      const idsToDelete = existing.slice(1).map((r: any) => r.id)
      await supabase.from('site_content').delete().in('id', idsToDelete)
    }
    // Update the first (and now only) row
    const { error: dbError } = await supabase
      .from('site_content')
      .update({
        content_value: newUrl,
        content_type,
        updated_at: new Date().toISOString()
      })
      .eq('id', existing[0].id)

    if (dbError) {
      return { error: dbError.message }
    }
  } else {
    // No existing row — insert one
    const { error: dbError } = await supabase
      .from('site_content')
      .insert([{
        page,
        section,
        content_key,
        content_value: newUrl,
        content_type,
        updated_at: new Date().toISOString()
      }])

    if (dbError) {
      return { error: dbError.message }
    }
  }

  revalidatePath('/', 'layout')
  revalidatePath('/admin/media')
  return { success: true, url: newUrl }
}

export async function addInsight(formData: FormData) {
  const supabase = createClient()
  
  const title = formData.get('title') as string
  const category = formData.get('category') as string
  const date_published = formData.get('date_published') as string
  const description = formData.get('description') as string
  const imageFile = formData.get('image') as File
  const galleryFiles = formData.getAll('gallery') as File[]
  const is_active = formData.get('is_active') === 'true'
  const display_order = parseInt(formData.get('display_order') as string) || 0

  if (!title || !category || !date_published || !imageFile || imageFile.size === 0) {
    throw new Error('All required fields must be provided')
  }

  // Upload main image
  const fileExt = imageFile.name.split('.').pop()
  const fileName = `insight_${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
  const buffer = await imageFile.arrayBuffer()

  const { error: uploadError } = await supabase.storage
    .from('public-assets')
    .upload(fileName, buffer, { contentType: imageFile.type })

  if (uploadError) {
    throw new Error(uploadError.message)
  }

  const { data: publicUrlData } = supabase.storage
    .from('public-assets')
    .getPublicUrl(fileName)

  const image_url = publicUrlData.publicUrl

  // Upload gallery images
  const gallery_urls: string[] = []
  if (galleryFiles && galleryFiles.length > 0) {
    for (const file of galleryFiles) {
      if (file.size === 0) continue // Skip empty file inputs
      
      const ext = file.name.split('.').pop()
      const gName = `gallery_${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${ext}`
      const gBuffer = await file.arrayBuffer()
      
      const { error: gError } = await supabase.storage
        .from('public-assets')
        .upload(gName, gBuffer, { contentType: file.type })
        
      if (!gError) {
        const { data: gUrl } = supabase.storage
          .from('public-assets')
          .getPublicUrl(gName)
        gallery_urls.push(gUrl.publicUrl)
      }
    }
  }

  const { error } = await supabase
    .from('insights')
    .insert([{ 
      title, 
      category, 
      date_published, 
      image_url, 
      description,
      gallery_urls: JSON.stringify(gallery_urls),
      is_active, 
      display_order 
    }])

  if (error) {
    console.error(error)
    throw new Error(error.message)
  }

  revalidatePath('/insights')
  revalidatePath('/admin/insights')
  redirect('/admin/insights')
}

export async function deleteInsight(id: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from('insights')
    .delete()
    .eq('id', id)
    
  if (error) return { error: error.message }
  revalidatePath('/insights')
  revalidatePath('/admin/insights')
  return { success: true }
}

export async function toggleInsightStatus(id: string, currentStatus: boolean) {
  const supabase = createClient()
  const { error } = await supabase
    .from('insights')
    .update({ is_active: !currentStatus })
    .eq('id', id)
    
  if (error) return { error: error.message }
  revalidatePath('/insights')
  revalidatePath('/admin/insights')
  return { success: true }
}

export async function addGalleryMedia(formData: FormData) {
  const supabase = createClient()
  
  const title = formData.get('title') as string
  let mediaType = formData.get('media_type') as string
  const file = formData.get('media') as File
  const is_active = formData.get('is_active') === 'true'
  const display_order = parseInt(formData.get('display_order') as string) || 0

  if (file && file.type) {
    if (file.type.startsWith('video/')) {
      mediaType = 'video'
    } else if (file.type.startsWith('image/')) {
      mediaType = 'image'
    }
  }

  if (!mediaType || !file || file.size === 0) {
    throw new Error('All required fields must be provided')
  }

  // Upload file
  const fileExt = file.name.split('.').pop()
  const fileName = `gallery_${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
  const buffer = await file.arrayBuffer()

  const { error: uploadError } = await supabase.storage
    .from('public-assets')
    .upload(fileName, buffer, { contentType: file.type })

  if (uploadError) {
    throw new Error(uploadError.message)
  }

  const { data: publicUrlData } = supabase.storage
    .from('public-assets')
    .getPublicUrl(fileName)

  const media_url = publicUrlData.publicUrl

  const { error } = await supabase
    .from('galleries')
    .insert([{ 
      title: title || '', 
      media_type: mediaType, 
      media_url, 
      is_active, 
      display_order 
    }])

  if (error) {
    console.error(error)
    throw new Error(error.message)
  }

  revalidatePath('/insights')
  revalidatePath('/admin/gallery')
  redirect('/admin/gallery')
}

export async function deleteGalleryMedia(id: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from('galleries')
    .delete()
    .eq('id', id)
    
  if (error) return { error: error.message }
  revalidatePath('/insights')
  revalidatePath('/admin/gallery')
  return { success: true }
}

export async function toggleGalleryMediaStatus(id: string, currentStatus: boolean) {
  const supabase = createClient()
  const { error } = await supabase
    .from('galleries')
    .update({ is_active: !currentStatus })
    .eq('id', id)
    
  if (error) return { error: error.message }
  revalidatePath('/insights')
  revalidatePath('/admin/gallery')
  return { success: true }
}
