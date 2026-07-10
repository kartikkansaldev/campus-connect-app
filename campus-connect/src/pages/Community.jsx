import { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient';

const CATEGORIES = [
  'All', 'General', 'Freshers', 'Academics', 'Coding', 'Clubs',
  'Placements', 'Hostel', 'Sports', 'Events', 'Buy & Sell',
  'Lost & Found', 'Memes'
];

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 60) return `${Math.floor(diff)}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

// Fire a browser push notification
function fireNotification(title, body) {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: '/favicon.svg',
      badge: '/favicon.svg',
    });
  }
}

// --- FLOATING CHAT WINDOW COMPONENT ---
function FloatingChatWindow({ targetUser, currentUser, onClose }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchMessages();
    
    // Subscribe to new messages between these two users
    const channel = supabase
      .channel(`chat-${currentUser.name}-${targetUser}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'community_messages',
      }, (payload) => {
        const msg = payload.new;
        if (
          (msg.sender === currentUser.name && msg.recipient === targetUser) ||
          (msg.sender === targetUser && msg.recipient === currentUser.name)
        ) {
          if (msg.sender !== currentUser.name) {
            setMessages(prev => [...prev, msg]);
            fireNotification(`New DM from ${msg.sender}`, msg.text);
          }
        }
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [targetUser, currentUser.name]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function fetchMessages() {
    setLoading(true);
    const { data } = await supabase
      .from('community_messages')
      .select('*')
      .or(`and(sender.eq.${currentUser.name},recipient.eq.${targetUser}),and(sender.eq.${targetUser},recipient.eq.${currentUser.name})`)
      .order('created_at', { ascending: true });
    
    setMessages(data || []);
    setLoading(false);
  }

  async function handleSendMessage(e) {
    e.preventDefault();
    const text = newMessage.trim();
    if (!text) return;
    
    const optimisticMsg = { 
      id: Date.now(),
      sender: currentUser.name, 
      recipient: targetUser, 
      text,
      created_at: new Date().toISOString()
    };
    
    setNewMessage('');
    setMessages(prev => [...prev, optimisticMsg]);
    
    const msgToInsert = { sender: currentUser.name, recipient: targetUser, text };
    const { data } = await supabase.from('community_messages').insert([msgToInsert]).select().single();
    
    if (data) {
      setMessages(prev => prev.map(m => m.id === optimisticMsg.id ? data : m));
    }
  }

  return (
    <div className="neo-card-static fixed bottom-6 right-6 w-80 sm:w-96 flex flex-col overflow-hidden z-50 animate-in slide-in-from-bottom-5" style={{ height: '450px' }}>
      <div className="px-4 py-3 flex items-center justify-between border-b-2 border-[var(--color-border)]" style={{ background: 'var(--color-accent)' }}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-[var(--color-accent)] text-xs shrink-0 border-2 border-[var(--color-border)]">
            {targetUser.substring(0, 2).toUpperCase()}
          </div>
          <span className="font-bold text-white text-sm">{targetUser}</span>
        </div>
        <button onClick={onClose} className="text-white hover:opacity-80 transition-opacity">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[var(--color-bg)]">
        {loading ? (
          <div className="text-center text-xs text-[var(--color-text-muted)] mt-4">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="text-center text-xs text-[var(--color-text-muted)] mt-4">No messages yet. Say hi! 👋</div>
        ) : (
          messages.map((m, i) => {
            const isMe = m.sender === currentUser.name;
            return (
              <div key={m.id || i} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[75%] px-3 py-2 rounded-xl text-sm border-[1.5px] border-[var(--color-border)] ${isMe ? 'text-white' : 'text-[var(--color-text)]'}`}
                  style={{
                    background: isMe ? 'var(--color-accent)' : 'var(--color-card)',
                    boxShadow: '2px 2px 0px 0px var(--color-border)',
                    borderBottomRightRadius: isMe ? '0px' : '0.75rem',
                    borderBottomLeftRadius: !isMe ? '0px' : '0.75rem',
                  }}
                >
                  {m.text}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-3 bg-[var(--color-card)] border-t-2 border-[var(--color-border)]">
        <div className="flex items-center gap-2">
          <input 
            type="text" 
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            autoFocus
            className="flex-1 bg-[var(--color-bg)] border-[1.5px] border-[var(--color-border-light)] rounded-xl px-3 py-2 outline-none text-sm font-medium placeholder:text-[var(--color-text-muted)] text-[var(--color-text)]"
          />
          <button 
            type="submit" 
            disabled={!newMessage.trim()}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white disabled:opacity-50 shrink-0 border-[1.5px] border-[var(--color-border)] shadow-[2px_2px_0px_0px_var(--color-border)]"
            style={{ background: 'var(--color-accent)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}

// --- FLOATING INBOX WINDOW ---
function FloatingInboxWindow({ currentUser, onOpenChat, onClose }) {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInbox();
  }, []);

  async function fetchInbox() {
    setLoading(true);
    const { data } = await supabase
      .from('community_messages')
      .select('*')
      .or(`sender.eq.${currentUser.name},recipient.eq.${currentUser.name}`)
      .order('created_at', { ascending: false });

    if (data) {
      const uniqueChats = new Map();
      data.forEach(msg => {
        const otherPerson = msg.sender === currentUser.name ? msg.recipient : msg.sender;
        if (!uniqueChats.has(otherPerson)) {
          uniqueChats.set(otherPerson, {
            name: otherPerson,
            lastMessage: msg.text,
            time: msg.created_at,
            isUnread: msg.recipient === currentUser.name
          });
        }
      });
      setConversations(Array.from(uniqueChats.values()));
    }
    setLoading(false);
  }

  return (
    <div className="neo-card-static fixed bottom-6 right-6 w-80 sm:w-96 flex flex-col overflow-hidden z-50 animate-in slide-in-from-bottom-5" style={{ height: '450px' }}>
      <div className="px-4 py-3 flex items-center justify-between border-b-2 border-[var(--color-border)] bg-[var(--color-card)]">
        <span className="font-extrabold text-[var(--color-text)] text-lg">Inbox</span>
        <button onClick={onClose} className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto bg-[var(--color-bg)]">
        {loading ? (
          <div className="text-center text-xs text-[var(--color-text-muted)] mt-8">Loading conversations...</div>
        ) : conversations.length === 0 ? (
          <div className="text-center text-xs text-[var(--color-text-muted)] mt-8">No messages yet.</div>
        ) : (
          <div className="flex flex-col">
            {conversations.map(chat => (
              <button 
                key={chat.name}
                onClick={() => onOpenChat(chat.name)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--color-card)] transition-colors text-left border-b border-[var(--color-border-light)]"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-sm shrink-0 border-2 border-[var(--color-border)] shadow-[2px_2px_0px_0px_var(--color-border)]" style={{ background: 'var(--color-accent)' }}>
                  {chat.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="font-bold text-sm text-[var(--color-text)] truncate">{chat.name}</span>
                    <span className="text-[10px] font-mono text-[var(--color-text-muted)] whitespace-nowrap ml-2">{timeAgo(chat.time)}</span>
                  </div>
                  <p className="text-xs text-[var(--color-text-secondary)] truncate">
                    {chat.lastMessage}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// --- POST CARD COMPONENT ---
function PostCard({ post, currentUser, onOpenChat }) {
  const [liked, setLiked] = useState(() => {
    const likes = JSON.parse(localStorage.getItem('cc_liked_posts') || '[]');
    return likes.includes(post.id);
  });
  const [likesCount, setLikesCount] = useState(post.likes_count || 0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [commentsCount, setCommentsCount] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const shareMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (shareMenuRef.current && !shareMenuRef.current.contains(e.target)) {
        setShowShareMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const commentInputRef = useRef(null);

  useEffect(() => {
    supabase
      .from('community_comments')
      .select('id', { count: 'exact', head: true })
      .eq('post_id', post.id)
      .then(({ count }) => {
        setCommentsCount(count ?? 0);
        if (count !== null && count !== post.comments_count) {
          supabase.from('community_posts').update({ comments_count: count }).eq('id', post.id);
        }
      });
  }, [post.id, post.comments_count]);

  useEffect(() => {
    const channel = supabase
      .channel(`comments-post-${post.id}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'community_comments',
        filter: `post_id=eq.${post.id}`,
      }, (payload) => {
        const newComment = payload.new;
        if (newComment.author !== currentUser.name) {
          setCommentsCount(prev => (prev ?? 0) + 1);
          setComments(prev => {
            if (commentsLoaded) return [...prev, newComment];
            return prev;
          });
          fireNotification(`💬 New comment on a post`, `${newComment.author}: "${newComment.text.substring(0, 60)}"`);
        }
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [post.id, currentUser.name, commentsLoaded]);

  useEffect(() => {
    const prevLikes = { count: likesCount };
    const channel = supabase
      .channel(`likes-post-${post.id}`)
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'community_posts',
        filter: `id=eq.${post.id}`,
      }, (payload) => {
        const newCount = payload.new.likes_count;
        if (newCount > prevLikes.count) {
          fireNotification(`❤️ Someone liked a post!`, `"${post.content.substring(0, 60)}..." now has ${newCount} likes`);
        }
        prevLikes.count = newCount;
        setLikesCount(newCount);
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [post.id, post.content]);

  async function handleLike() {
    const likedPosts = JSON.parse(localStorage.getItem('cc_liked_posts') || '[]');
    const newLiked = !liked;
    const newCount = newLiked ? likesCount + 1 : Math.max(0, likesCount - 1);
    setLiked(newLiked);
    setLikesCount(newCount);
    const updated = newLiked
      ? [...likedPosts, post.id]
      : likedPosts.filter(id => id !== post.id);
    localStorage.setItem('cc_liked_posts', JSON.stringify(updated));
    await supabase.from('community_posts').update({ likes_count: newCount }).eq('id', post.id);
  }

  async function loadComments() {
    if (commentsLoaded) return;
    const { data } = await supabase
      .from('community_comments')
      .select('*')
      .eq('post_id', post.id)
      .order('created_at', { ascending: true });
    const loaded = data || [];
    setComments(loaded);
    setCommentsCount(loaded.length);
    setCommentsLoaded(true);
  }

  async function handleToggleComments() {
    const next = !showComments;
    setShowComments(next);
    if (next) {
      await loadComments();
      setTimeout(() => commentInputRef.current?.focus(), 100);
    }
  }

  async function handleSubmitComment(e) {
    e.preventDefault();
    const text = newComment.trim();
    if (!text || submitting) return;
    setSubmitting(true);
    
    const optimisticComment = { 
      id: Date.now(), 
      post_id: post.id, 
      author: currentUser.name, 
      initials: currentUser.initials, 
      text,
      created_at: new Date().toISOString()
    };
    setNewComment('');
    setComments(prev => [...prev, optimisticComment]);
    const newCount = (commentsCount ?? 0) + 1;
    setCommentsCount(newCount);
    
    const commentToInsert = { post_id: post.id, author: currentUser.name, initials: currentUser.initials, text };
    const { data } = await supabase.from('community_comments').insert([commentToInsert]).select().single();
    
    if (data) {
      setComments(prev => prev.map(c => c.id === optimisticComment.id ? data : c));
      await supabase.from('community_posts').update({ comments_count: newCount }).eq('id', post.id);
    }
    setSubmitting(false);
  }

  function handleToggleShare() {
    if (navigator.share && window.innerWidth < 768) {
      navigator.share({
        title: `Campus Grid — Post by ${post.author}`,
        text: post.content,
        url: window.location.href,
      }).catch(() => {});
    } else {
      setShowShareMenu(prev => !prev);
    }
  }

  async function handleCopyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setShowShareMenu(false);
  }

  const shareText = encodeURIComponent(`${post.content}\n\nShared from Campus Grid`);
  const shareUrl = encodeURIComponent(window.location.href);

  const SHARE_PLATFORMS = [
    { name: 'WhatsApp', color: '#25D366', icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488', url: `https://web.whatsapp.com/send?text=${shareText}` },
    { name: 'Telegram', color: '#229ED9', icon: 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z', url: `https://t.me/share/url?url=${shareUrl}&text=${shareText}` },
    { name: 'Twitter / X', color: '#000000', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.766l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z', url: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}` },
    { name: 'LinkedIn', color: '#0A66C2', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z', url: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}` },
    { name: 'Email', color: '#EA4335', icon: 'M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z', url: `mailto:?subject=${encodeURIComponent('Check this out on Campus Grid!')}&body=${shareText}` },
  ];

  const displayCount = commentsCount ?? 0;
  const isMe = post.author === currentUser.name;

  return (
    <div className="neo-card-static bg-white p-5">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[var(--color-border)] text-white flex items-center justify-center font-bold text-sm">
            {post.initials}
          </div>
          <div>
            <h4 className="font-bold text-sm">{post.author}</h4>
            <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider font-mono">{timeAgo(post.created_at)}</p>
          </div>
        </div>
        <span className="px-2.5 py-1 bg-[var(--color-card)] rounded border border-[var(--color-border-light)] text-[10px] font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">
          {post.category}
        </span>
      </div>

      <p className="text-sm leading-relaxed text-[var(--color-text)] mb-4">{post.content}</p>

      <div className="flex items-center gap-6 pt-3 border-t border-[var(--color-border-light)]">
        <button onClick={handleLike} className={`flex items-center gap-2 text-xs font-bold transition-colors cursor-pointer ${liked ? 'text-[#E11D48]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]'}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill={liked ? '#E11D48' : 'none'} stroke="currentColor" strokeWidth="2.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          {likesCount}
        </button>

        <button onClick={handleToggleComments} className={`flex items-center gap-2 text-xs font-bold transition-colors cursor-pointer ${showComments ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]'}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
          </svg>
          {displayCount} Comments
        </button>

        {!isMe && (
          <button 
            onClick={() => onOpenChat(post.author)} 
            className="flex items-center gap-2 text-xs font-bold text-[var(--color-accent)] hover:opacity-70 transition-opacity cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
            </svg>
            <span className="hidden sm:inline">Message</span>
          </button>
        )}

        <div className="relative ml-auto" ref={shareMenuRef}>
          <button onClick={handleToggleShare} className="flex items-center gap-2 text-xs font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors cursor-pointer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>

        {showShareMenu && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }} onClick={() => setShowShareMenu(false)}>
            <div className="neo-card-static bg-white overflow-hidden w-full max-w-sm" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between px-5 py-3 border-b-2 border-[var(--color-border-light)]">
                <p className="text-sm font-bold uppercase tracking-widest text-[var(--color-text-muted)] font-mono">Share via</p>
                <button onClick={() => setShowShareMenu(false)} className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
              <div className="px-5 py-3 text-xs text-[var(--color-text-secondary)] font-medium line-clamp-2 bg-[var(--color-bg)] border-b-2 border-[var(--color-border-light)]">
                "{post.content.substring(0, 80)}{post.content.length > 80 ? '…' : ''}"
              </div>
              <div className="p-3 grid grid-cols-2 gap-2">
                {SHARE_PLATFORMS.map(platform => (
                  <a key={platform.name} href={platform.url} target="_blank" rel="noopener noreferrer" onClick={() => setShowShareMenu(false)} className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold hover:opacity-80 transition-opacity" style={{ background: platform.color, color: 'white', boxShadow: '2px 2px 0px 0px var(--color-border)' }}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="white" className="shrink-0"><path d={platform.icon}/></svg>
                    {platform.name}
                  </a>
                ))}
              </div>
              <div className="px-3 pb-3">
                <button onClick={handleCopyLink} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all bg-[var(--color-card-inner)] border-2 border-[var(--color-border)] shadow-[2px_2px_0px_0px_var(--color-border)]">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                  </svg>
                  Copy Link to Clipboard
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {showComments && (
        <div className="px-5 py-4 space-y-3 bg-[var(--color-bg)] border-t border-[var(--color-border-light)]">
          {comments.length === 0 && <p className="text-xs text-[var(--color-text-muted)] text-center py-2">No comments yet. Be the first!</p>}
          {comments.map(c => {
            const isCommentMine = c.author === currentUser.name;
            return (
              <div key={c.id} className="flex gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white shrink-0 bg-[var(--color-border)] shadow-[1px_1px_0px_0px_var(--color-border)]">
                  {c.initials}
                </div>
                <div className="flex-1 bg-white rounded-xl px-3 py-2 group relative border-[1.5px] border-[var(--color-border-light)] shadow-[2px_2px_0px_0px_var(--color-border)]">
                  <div className="flex justify-between items-start">
                    <p className="text-xs font-bold text-[var(--color-text)]">{c.author}</p>
                    {!isCommentMine && (
                      <button onClick={() => onOpenChat(c.author)} className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--color-accent)] hover:text-blue-700 p-1 rounded-md" title={`Message ${c.author}`}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                      </button>
                    )}
                  </div>
                  <p className="text-sm text-[var(--color-text)] mt-0.5 pr-6">{c.text}</p>
                </div>
              </div>
            );
          })}

          <form onSubmit={handleSubmitComment} className="flex gap-3 items-center pt-1">
            <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white shrink-0 bg-[var(--color-accent)] shadow-[2px_2px_0px_0px_var(--color-border)]">
              {currentUser.initials}
            </div>
            <div className="flex-1 flex items-center gap-2 bg-white rounded-xl px-4 py-2 transition-all border-2 border-[var(--color-border-light)] shadow-[2px_2px_0px_0px_var(--color-border)]">
              <input ref={commentInputRef} type="text" value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="Write a comment..." className="flex-1 bg-transparent outline-none text-sm font-medium placeholder:text-[var(--color-text-muted)] text-[var(--color-text)]" />
              <button type="submit" disabled={!newComment.trim() || submitting} className="text-[var(--color-accent)] disabled:opacity-30 transition-opacity shrink-0 cursor-pointer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function useNotificationPermission() {
  const [permission, setPermission] = useState(Notification.permission);
  useEffect(() => {
    if (Notification.permission === 'default') {
      const timer = setTimeout(async () => {
        const result = await Notification.requestPermission();
        setPermission(result);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);
  return permission;
}

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('General');
  const [showPostForm, setShowPostForm] = useState(false);
  const [submittingPost, setSubmittingPost] = useState(false);
  
  const [activeChatUser, setActiveChatUser] = useState(null);
  const [showInbox, setShowInbox] = useState(false);

  const notifPermission = useNotificationPermission();
  const currentUser = { name: 'You', initials: 'ME' };

  useEffect(() => { fetchPosts(); }, []);

  async function fetchPosts() {
    setLoading(true);
    const { data } = await supabase.from('community_posts').select('*').order('created_at', { ascending: false });
    setPosts(data || []);
    setLoading(false);
  }

  async function handleCreatePost(e) {
    e.preventDefault();
    const content = newPostContent.trim();
    if (!content || submittingPost) return;
    setSubmittingPost(true);
    
    const optimisticPost = {
      id: Date.now(),
      author: currentUser.name,
      initials: currentUser.initials,
      category: newPostCategory,
      content,
      likes_count: 0,
      comments_count: 0,
      created_at: new Date().toISOString()
    };
    
    setNewPostContent('');
    setShowPostForm(false);
    setPosts(prev => [optimisticPost, ...prev]);

    const { data } = await supabase.from('community_posts').insert([{
      author: currentUser.name,
      initials: currentUser.initials,
      category: newPostCategory,
      content,
      likes_count: 0,
      comments_count: 0,
    }]).select().single();
    
    if (data) {
      setPosts(prev => prev.map(p => p.id === optimisticPost.id ? data : p));
    }
    setSubmittingPost(false);
  }

  const filteredPosts = posts.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.content.toLowerCase().includes(search.toLowerCase()) || p.author.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="animate-in flex flex-col md:flex-row gap-6 md:gap-8 h-[calc(100vh-7rem)] md:h-[calc(100vh-6rem)]">
      <style>{`
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Sidebar Navigation */}
      <div className="w-full md:w-[260px] shrink-0 h-auto md:h-full overflow-y-visible md:overflow-y-auto hide-scroll pb-2 md:pb-10 min-w-0">
        <h1 className="text-3xl font-extrabold font-heading mb-6">Community</h1>

        {/* Search Bar */}
        <div className="neo-card-static flex items-center px-4 py-3 gap-3 bg-[var(--color-bg)] mb-6">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input type="text" placeholder="Search posts..." value={search} onChange={e => setSearch(e.target.value)} className="flex-1 bg-transparent outline-none text-sm font-medium placeholder:text-[var(--color-text-muted)] text-[var(--color-text)]" />
        </div>

        {/* Inbox Quick Access */}
        <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2 px-1 font-mono">Messages</p>
        <button 
          onClick={() => { setShowInbox(true); setActiveChatUser(null); }}
          className="w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-150 mb-5 flex items-center justify-between"
          style={{ background: 'var(--color-card)', border: '2px solid var(--color-border)', boxShadow: '2px 2px 0 0 var(--color-border)' }}
        >
          <span className="font-bold text-[var(--color-text)]">📥 Open Inbox</span>
        </button>

        {/* Topics List */}
        <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2 px-1 font-mono">Topics</p>
        <div className="flex flex-row md:flex-col gap-2 mb-5 overflow-x-auto hide-scroll pb-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)} 
                className="whitespace-nowrap text-left px-3 py-2 rounded-lg text-sm transition-all duration-150 cursor-pointer" 
                style={{ 
                  background: 'var(--color-card)', 
                  color: isActive ? 'var(--color-text)' : 'var(--color-text-secondary)', 
                  border: isActive ? '2px solid var(--color-border)' : '2px solid var(--color-border-light)', 
                  fontWeight: isActive ? 700 : 500, 
                  boxShadow: isActive ? '4px 4px 0 0 var(--color-border)' : '2px 2px 0 0 var(--color-border-light)', 
                  transform: isActive ? 'translate(-2px, -2px)' : 'none' 
                }}
              >
                {cat === 'All' ? '🏠 All Posts' : `# ${cat}`}
              </button>
            );
          })}
        </div>

        {notifPermission === 'denied' && (
          <div className="px-3 py-2 rounded-lg text-xs font-semibold text-[#92400E] bg-[#FEF3C7] border-[1.5px] border-[#FDE68A] shadow-[2px_2px_0px_0px_var(--color-border)] mt-6">
            🔕 Notifications blocked. Enable in browser settings.
          </div>
        )}
      </div>

      {/* Main Feed */}
      <div className="flex-1 space-y-5 h-full overflow-y-auto hide-scroll pb-20 pr-1 min-h-0">
        
        {/* Post Composer */}
        {!showPostForm ? (
          <div onClick={() => setShowPostForm(true)} className="neo-card-static p-4 bg-white flex items-center gap-4 border-2 border-dashed border-[var(--color-border-light)] hover:border-[var(--color-border)] transition-colors cursor-text">
             <div className="w-10 h-10 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center font-bold text-sm border-2 border-[var(--color-border)] shrink-0">ME</div>
             <p className="text-[var(--color-text-muted)] font-medium text-sm">What's on your mind? Ask the campus...</p>
          </div>
        ) : (
          <div className="neo-card-static p-5 bg-white">
            <form onSubmit={handleCreatePost} className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center font-bold text-sm border-2 border-[var(--color-border)] shrink-0">ME</div>
                <textarea autoFocus value={newPostContent} onChange={e => setNewPostContent(e.target.value)} placeholder="What's on your mind? Ask the campus..." rows={3} className="flex-1 bg-transparent outline-none text-sm font-medium placeholder:text-[var(--color-text-muted)] resize-none text-[var(--color-text)]" />
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border-light)]">
                <select value={newPostCategory} onChange={e => setNewPostCategory(e.target.value)} className="text-sm font-semibold rounded-lg px-3 py-2 bg-[var(--color-bg)] text-[var(--color-text)] outline-none cursor-pointer border-2 border-[var(--color-border-light)]">
                  {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <div className="flex gap-3">
                  <button type="button" onClick={() => { setShowPostForm(false); setNewPostContent(''); }} className="px-4 py-2 rounded-lg text-sm font-bold text-[var(--color-text-secondary)] hover:bg-[var(--color-bg)] transition-colors cursor-pointer">Cancel</button>
                  <button type="submit" disabled={!newPostContent.trim() || submittingPost} className="btn-primary cursor-pointer disabled:opacity-40">{submittingPost ? 'Posting...' : 'Post'}</button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Feed */}
        {loading ? (
          <div className="text-center py-16 text-[var(--color-text-muted)] neo-card-static bg-white">
            <div className="w-8 h-8 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm font-medium">Loading feed...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-16 text-[var(--color-text-muted)] neo-card-static bg-white">
            <p className="text-2xl mb-2">💬</p>
            <p className="font-semibold">No posts yet in this topic!</p>
            <p className="text-sm mt-1">Be the first to start the conversation.</p>
          </div>
        ) : (
          filteredPosts.map(post => (
            <PostCard 
              key={post.id} 
              post={post} 
              currentUser={currentUser} 
              onOpenChat={(author) => setActiveChatUser(author)} 
            />
          ))
        )}
      </div>

      {showInbox && !activeChatUser && (
        <FloatingInboxWindow 
          currentUser={currentUser}
          onClose={() => setShowInbox(false)}
          onOpenChat={(author) => {
            setShowInbox(false);
            setActiveChatUser(author);
          }}
        />
      )}

      {activeChatUser && (
        <FloatingChatWindow 
          targetUser={activeChatUser}
          currentUser={currentUser}
          onClose={() => setActiveChatUser(null)}
        />
      )}
    </div>
  );
}
