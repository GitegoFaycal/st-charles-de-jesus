import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Loader } from './components/ui'
import { useContent } from './context/ContentContext'
import { useAuth } from './context/AuthContext'

import Home from './pages/Home'
import { About, HeadTeacherMessage, Facilities, Policies, WorkWithUs } from './pages/AboutPages'
import { Admissions, Fees, ApplicationForm } from './pages/AdmissionsPages'
import { AcademicStaff, Programmes, ProgramDetail } from './pages/AcademicPages'
import { StudentLife, Calendar, Clubs, Sports, Gallery } from './pages/StudentLifePages'
import { NewsList, NewsDetail } from './pages/NewsPages'
import { Alumni, Contacts, Faqs, Privacy, NotFound } from './pages/MiscPages'

import AdminLayout from './admin/AdminLayout'
import Login from './admin/Login'
import Dashboard from './admin/Dashboard'
import SectionEditor from './admin/SectionEditor'
import CollectionEditor from './admin/CollectionEditor'
import Submissions from './admin/Submissions'
import Media from './admin/Media'
import Account from './admin/Account'

function PublicLayout() {
  const { content, loading, error } = useContent()
  if (loading) return <Loader label="Loading Saint Charles de Jesus TSS…" />
  if (error || !content)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
        <h1 className="font-heading text-2xl font-bold">We could not reach the school server.</h1>
        <p className="mt-2 text-ink-soft">Make sure the backend is running on port 5000, then refresh this page.</p>
      </div>
    )
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

function RequireAuth() {
  const { user, ready } = useAuth()
  if (!ready) return <Loader />
  if (!user) return <Navigate to="/admin/login" replace />
  return <Outlet />
}

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="about/head-teacher-message" element={<HeadTeacherMessage />} />
        <Route path="about/facilities" element={<Facilities />} />
        <Route path="about/policies" element={<Policies />} />
        <Route path="about/work-with-us" element={<WorkWithUs />} />
        <Route path="admissions" element={<Admissions />} />
        <Route path="admissions/fees" element={<Fees />} />
        <Route path="admissions/apply" element={<ApplicationForm />} />
        <Route path="academics/staff" element={<AcademicStaff />} />
        <Route path="academics/programmes" element={<Programmes />} />
        <Route path="academics/programmes/:slug" element={<ProgramDetail />} />
        <Route path="student-life" element={<StudentLife />} />
        <Route path="student-life/calendar" element={<Calendar />} />
        <Route path="student-life/clubs" element={<Clubs />} />
        <Route path="student-life/sports" element={<Sports />} />
        <Route path="student-life/gallery" element={<Gallery />} />
        <Route path="news" element={<NewsList />} />
        <Route path="news/:slug" element={<NewsDetail />} />
        <Route path="alumni" element={<Alumni />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="faqs" element={<Faqs />} />
        <Route path="privacy-policy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin" element={<RequireAuth />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="sections/:section" element={<SectionEditor />} />
          <Route path="collections/:name" element={<CollectionEditor />} />
          <Route path="submissions/:type" element={<Submissions />} />
          <Route path="media" element={<Media />} />
          <Route path="account" element={<Account />} />
        </Route>
      </Route>
    </Routes>
  )
}
